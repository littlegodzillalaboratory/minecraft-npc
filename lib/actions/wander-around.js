"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class WanderAroundAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Wandering around...");
    const destination = await this.npc.wander();
    const outcome = await this.moveToOutcome(destination);
    this.registerInfo(outcome);
  }
}

export { WanderAroundAction as default };
