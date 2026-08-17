"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class StayHereAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Staying here...");
    const status = await this.npc.stop();
    this.registerInfo(status);
  }
}

export { StayHereAction as default };
