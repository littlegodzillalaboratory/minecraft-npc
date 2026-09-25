"use strict";
import Survivor from "./engines/survivor.js";

const DEFAULT_ENGINE = "survivor";

/**
 * Coordinate the NPC's autonomous operating mode without implementing an
 * autonomous policy itself. AutoMode owns the registry and selection of policy
 * engines, ensures that only one engine is active, delegates lifecycle and
 * status operations to that engine, and stops the current engine when changing
 * policies. Keeping this orchestration separate lets callers enable or disable
 * auto-mode through one stable API while future character policies can be
 * introduced as additional BaseEngine implementations.
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
