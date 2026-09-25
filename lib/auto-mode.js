"use strict";
import Survivor from "./engines/survivor.js";

const DEFAULT_ENGINE = "survivor";

/**
 * Manage auto-mode independently from the policy engine selected to run it.
 * New policies can be registered here without changing mode lifecycle callers.
 */
class AutoMode {
  constructor(npc, opts = {}) {
    this.defaultEngineName = opts.autoModeEngine || DEFAULT_ENGINE;
    this.engines = new Map([["survivor", new Survivor(npc, opts)]]);
    this.activeEngine = undefined;
  }

  /** Enable auto-mode using the requested registered policy engine. */
  async enable(engineName = this.defaultEngineName) {
    const engine = this.engines.get(engineName);
    if (!engine) {
      return {
        status: "failed",
        message: `Unknown auto-mode engine: ${engineName}`,
      };
    }
    if (this.activeEngine && this.activeEngine !== engine) {
      await this.activeEngine.stop();
    }
    this.activeEngine = engine;
    return engine.start();
  }

  /** Disable the selected policy engine and its autonomous activity. */
  async disable() {
    if (!this.activeEngine) return "success";
    return this.activeEngine.stop();
  }

  /** Return mode state together with the selected policy engine identity. */
  getStatus() {
    const engine =
      this.activeEngine || this.engines.get(this.defaultEngineName);
    return {
      engine: engine?.getId().toLowerCase(),
      ...(engine?.getStatus() || {
        enabled: false,
        currentGoal: "idle",
        lastOutcome: undefined,
      }),
    };
  }
}

export { AutoMode as default };
