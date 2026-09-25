"use strict";
import bag from "bagofcli";

import AttackNearestMobAction from "../actions/attack-nearest-mob.js";
import EatAction from "../actions/eat.js";
import FleeAction from "../actions/flee.js";
import GoHomeAction from "../actions/go-home.js";
import HuntFoodAction from "../actions/hunt-food.js";
import SleepAction from "../actions/sleep.js";
import BaseEngine from "./base.js";

const DEFAULTS = {
  evaluationIntervalInSeconds: 2,
  hungerThreshold: 14,
  minimumFoodReserve: 12,
  fleeHealthThreshold: 8,
  allowedHuntAnimals: ["cow", "pig", "chicken", "sheep", "rabbit"],
  maximumHuntingDistance: 64,
  threatRadius: 16,
  homeRadius: 3,
  sleepRetryCooldownInSeconds: 30,
};

const NIGHT_START = 13000;
const NIGHT_END = 23000;

/**
 * Continuously evaluates deterministic survival policy and delegates decisions
 * to the same actions available to players. Higher-level autonomous planning
 * can be added as another engine without changing the action or skill layers.
 */
class Homesteader extends BaseEngine {
  constructor(npc, opts = {}) {
    super(npc);
    this.config = {
      evaluationIntervalInSeconds:
        opts.autoModeEvaluationIntervalInSeconds ??
        DEFAULTS.evaluationIntervalInSeconds,
      hungerThreshold: opts.autoModeHungerThreshold ?? DEFAULTS.hungerThreshold,
      minimumFoodReserve:
        opts.autoModeMinimumFoodReserve ?? DEFAULTS.minimumFoodReserve,
      fleeHealthThreshold:
        opts.autoModeFleeHealthThreshold ?? DEFAULTS.fleeHealthThreshold,
      allowedHuntAnimals:
        opts.autoModeAllowedHuntAnimals ?? DEFAULTS.allowedHuntAnimals,
      maximumHuntingDistance:
        opts.autoModeMaximumHuntingDistance ?? DEFAULTS.maximumHuntingDistance,
      threatRadius: opts.autoModeThreatRadius ?? DEFAULTS.threatRadius,
      homeRadius: opts.autoModeHomeRadius ?? DEFAULTS.homeRadius,
      sleepRetryCooldownInSeconds:
        opts.autoModeSleepRetryCooldownInSeconds ??
        DEFAULTS.sleepRetryCooldownInSeconds,
    };
    this.lastSleepAttemptAt = undefined;
  }

  /** Return the stable identifier used for this autonomous policy engine. */
  getId() {
    return this.constructor.name;
  }

  /** Return the configured delay between survival policy evaluations. */
  getEvaluationIntervalInSeconds() {
    return this.config.evaluationIntervalInSeconds;
  }

  /** Observe survival state, select one policy decision, and execute it. */
  async evaluate() {
    bag.logStepHeading("Evaluating...");
    const state = this.npc.getSurvivalState(this.config.threatRadius);
    const decision = this._selectDecision(state);
    if (decision.goal === "sleep at home") {
      this.lastSleepAttemptAt = Date.now();
    }
    const outcome = decision.action
      ? ((await decision.action.do(decision.opts)) ?? "success")
      : "idle";
    return { goal: decision.goal, outcome: outcome };
  }

  _selectDecision(state) {
    const threat = state.nearbyThreats[0];
    if (threat && state.health <= this.config.fleeHealthThreshold) {
      bag.logStepItemSuccess("Threat detected while health is low");
      return {
        goal: "flee from threat",
        action: new FleeAction(this.npc),
        opts: { source: "auto-mode" },
      };
    }
    if (threat) {
      bag.logStepItemSuccess("Threat detected");
      return {
        goal: `defend against ${threat}`,
        action: new AttackNearestMobAction(this.npc),
        opts: {
          message: `attack nearest ${threat}`,
          messageElems: [undefined, threat],
          source: "auto-mode",
        },
      };
    }
    if (state.hunger <= this.config.hungerThreshold && state.foodCount > 0) {
      bag.logStepItemSuccess("Hunger detected and food is available");
      return {
        goal: "eat available food",
        action: new EatAction(this.npc),
        opts: { source: "auto-mode" },
      };
    }
    if (this._isNight(state.timeOfDay)) {
      const home = this.npc.getOpts().initCoords || [0, 0, 0];
      if (!this._isAtHome(state.position, home)) {
        bag.logStepItemSuccess("Night detected while away from home");
        return {
          goal: "return home for the night",
          action: new GoHomeAction(this.npc),
          opts: { source: "auto-mode" },
        };
      }
      if (this._canRetrySleep()) {
        bag.logStepItemSuccess("Night detected while at home");
        return {
          goal: "sleep at home",
          action: new SleepAction(this.npc),
          opts: { source: "auto-mode" },
        };
      }
      bag.logStepItemSuccess("Waiting before retrying sleep");
      return {
        goal: "wait to retry sleep",
        action: undefined,
        opts: {},
      };
    }
    if (state.foodCount < this.config.minimumFoodReserve) {
      bag.logStepItemSuccess("Low food reserves detected");
      const animal = this.npc.findNearestAllowedAnimal(
        this.config.allowedHuntAnimals,
        this.config.maximumHuntingDistance,
      );
      if (animal) {
        bag.logStepItemSuccess(
          `Allowed hunting target detected: ${animal.name}`,
        );
        return {
          goal: `hunt ${animal.name}`,
          action: new HuntFoodAction(this.npc),
          opts: {
            allowedAnimals: this.config.allowedHuntAnimals,
            maximumDistance: this.config.maximumHuntingDistance,
            source: "auto-mode",
          },
        };
      }
    }
    bag.logStepItemSuccess("No survival action needed");
    return { goal: "idle", action: undefined, opts: {} };
  }

  /** Return whether Minecraft time is within the normal sleeping period. */
  _isNight(timeOfDay) {
    return timeOfDay >= NIGHT_START && timeOfDay <= NIGHT_END;
  }

  /** Return whether the observed position is within the configured home area. */
  _isAtHome(position, home) {
    if (!position || !home) return false;
    const [homeX, homeY, homeZ] = home;
    const dx = position.x - homeX;
    const dy = position.y - homeY;
    const dz = position.z - homeZ;
    return Math.sqrt(dx * dx + dy * dy + dz * dz) <= this.config.homeRadius;
  }

  /** Return whether enough time has passed since the previous sleep attempt. */
  _canRetrySleep() {
    if (this.lastSleepAttemptAt === undefined) return true;
    const cooldownInMillis = this.config.sleepRetryCooldownInSeconds * 1000;
    return Date.now() - this.lastSleepAttemptAt >= cooldownInMillis;
  }
}

export { Homesteader as default };
