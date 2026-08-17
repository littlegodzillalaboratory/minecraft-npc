"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class WanderAroundAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Wandering around...");
    const status = await this.npc.wander();
    this.registerInfo(status);
  }
}

export { WanderAroundAction as default };
