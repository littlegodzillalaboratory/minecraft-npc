"use strict";
import AttackNearestMobAction from "../actions/attack-nearest-mob.js";
import EatAction from "../actions/eat.js";
import FleeAction from "../actions/flee.js";
import HuntFoodAction from "../actions/hunt-food.js";
import BaseEngine from "./base.js";

const DEFAULTS = {
  evaluationIntervalInSeconds: 2,
  hungerThreshold: 14,
  minimumFoodReserve: 12,
  fleeHealthThreshold: 8,
  allowedHuntAnimals: ["cow", "pig", "chicken", "sheep", "rabbit"],
  maximumHuntingDistance: 64,
  threatRadius: 16,
};

/**
 * Continuously evaluates deterministic survival policy and delegates decisions
 * to the same actions available to players. Higher-level autonomous planning
 * can be added as another engine without changing the action or skill layers.
 */
class AutoMode extends BaseEngine {
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
    };
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
    const state = this.npc.getSurvivalState(this.config.threatRadius);
    const decision = this._selectDecision(state);
    const outcome = decision.action
      ? ((await decision.action.do(decision.opts)) ?? "success")
      : "idle";
    return { goal: decision.goal, outcome: outcome };
  }

  _selectDecision(state) {
    const threat = state.nearbyThreats[0];
    if (threat && state.health <= this.config.fleeHealthThreshold) {
      return {
        goal: "flee from threat",
        action: new FleeAction(this.npc),
        opts: { source: "auto-mode" },
      };
    }
    if (threat) {
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
      return {
        goal: "eat available food",
        action: new EatAction(this.npc),
        opts: { source: "auto-mode" },
      };
    }
    if (state.foodCount < this.config.minimumFoodReserve) {
      const animal = this.npc.findNearestAllowedAnimal(
        this.config.allowedHuntAnimals,
        this.config.maximumHuntingDistance,
      );
      if (animal) {
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
    return { goal: "idle", action: undefined, opts: {} };
  }
}

export { AutoMode as default };
