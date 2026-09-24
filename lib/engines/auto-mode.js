"use strict";
import AttackNearestMobAction from "../actions/attack-nearest-mob.js";
import EatAction from "../actions/eat.js";
import FleeAction from "../actions/flee.js";
import HuntFoodAction from "../actions/hunt-food.js";

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
class AutoMode {
  constructor(npc, opts = {}) {
    this.npc = npc;
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
    this.enabled = false;
    this.evaluating = false;
    this.currentGoal = "idle";
    this.lastOutcome = undefined;
    this.timer = undefined;
  }

  /** Enable auto-mode and immediately schedule its first evaluation. */
  start() {
    if (this.enabled) return "success";
    this.enabled = true;
    this.currentGoal = "idle";
    this._schedule(0);
    return "success";
  }

  /** Disable auto-mode, cancel its timer, and stop autonomous movement. */
  async stop() {
    const wasEnabled = this.enabled;
    this.enabled = false;
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
    this.currentGoal = "idle";
    if (wasEnabled) await this.npc.stop();
    return "success";
  }

  /** Return display-ready lifecycle information without exposing internals. */
  getStatus() {
    return {
      enabled: this.enabled,
      currentGoal: this.currentGoal,
      lastOutcome: this.lastOutcome,
    };
  }

  _schedule(delayInMillis) {
    if (!this.enabled) return;
    this.timer = setTimeout(() => this._evaluate(), delayInMillis);
    this.timer.unref?.();
  }

  async _evaluate() {
    if (!this.enabled || this.evaluating) return;
    this.evaluating = true;
    try {
      const state = this.npc.getSurvivalState(this.config.threatRadius);
      const decision = this._selectDecision(state);
      this.currentGoal = decision.goal;
      this.lastOutcome = decision.action
        ? ((await decision.action.do(decision.opts)) ?? "success")
        : "idle";
    } catch (err) {
      this.lastOutcome = `failed: ${err.message}`;
    } finally {
      this.evaluating = false;
      this._schedule(this.config.evaluationIntervalInSeconds * 1000);
    }
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
