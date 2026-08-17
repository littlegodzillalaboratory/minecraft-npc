"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class StandUpAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Standing up...");
    const status = await this.npc.sneak(false);
    this.registerInfo(status);
  }
}

export { StandUpAction as default };
