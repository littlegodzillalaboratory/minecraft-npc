"use strict";
import bag from "bagofcli";

/**
 * Provide the shared lifecycle contract for continuously evaluated NPC
 * engines. Concrete engines supply their identity, evaluation interval, and
 * policy while this class owns scheduling, status, overlap prevention, and
 * error handling.
 */
class BaseEngine {
  constructor(npc) {
    this.npc = npc;
    this.enabled = false;
    this.evaluating = false;
    this.currentGoal = "idle";
    this.lastOutcome = undefined;
    this.timer = undefined;
  }

  /** Return the stable engine identifier implemented by a concrete engine. */
  getId() {
    bag.logStepItemError("Engine should implement getId method!");
  }

  /** Return the concrete engine's evaluation interval in seconds. */
  getEvaluationIntervalInSeconds() {
    bag.logStepItemError(
      "Engine should implement getEvaluationIntervalInSeconds method!",
    );
  }

  /** Evaluate concrete policy and return its current goal and outcome. */
  evaluate() {
    bag.logStepItemError("Engine should implement evaluate method!");
  }

  /** Enable the engine and immediately schedule its first evaluation. */
  start() {
    if (this.enabled) return "success";
    this.enabled = true;
    this.currentGoal = "idle";
    this._schedule(0);
    return "success";
  }

  /** Disable the engine, cancel its timer, and stop autonomous movement. */
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
      const result = await this.evaluate();
      this.currentGoal = result?.goal ?? "idle";
      this.lastOutcome = result?.outcome ?? "idle";
    } catch (err) {
      this.lastOutcome = `failed: ${err.message}`;
    } finally {
      this.evaluating = false;
      this._schedule(this.getEvaluationIntervalInSeconds() * 1000);
    }
  }
}

export { BaseEngine as default };
