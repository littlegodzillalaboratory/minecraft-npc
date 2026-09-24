"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FleeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Fleeing...");
    const destination = await this.npc.flee();
    const outcome = await this.moveToOutcome(destination);
    this.registerInfo(outcome);
  }
}

export { FleeAction as default };
