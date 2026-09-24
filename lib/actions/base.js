"use strict";
import bag from "bagofcli";

class BaseAction {
  constructor(npc) {
    this.npc = npc;
  }

  getId() {
    bag.logStepItemError("Action should implement getId method!");
  }

  do(opts) {
    bag.logStepItemError("Action should implement do method!");
  }

  /**
   * Register an action outcome and relay any player-facing message returned by
   * a domain skill. Skills describe outcomes; actions own communication.
   *
   * @param {string|Object} outcome skill status or structured skill outcome
   */
  registerInfo(outcome) {
    const status = outcome?.status || outcome;
    if (outcome?.message) {
      // sayMessage performs its synchronous chat operation before resolving.
      void this.npc.sayMessage(outcome.message);
    }
    this.npc.getRegister().setActionInfo(this.getId(), status);
  }

  /** Move to a successful position-query result, preserving query failures. */
  async moveToOutcome(outcome) {
    if (outcome.status !== "success") return outcome;
    return this.npc.moveToLocation(
      outcome.value.posX,
      outcome.value.posY,
      outcome.value.posZ,
    );
  }
}

export { BaseAction as default };
