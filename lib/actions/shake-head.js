"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ShakeHeadAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Shaking head...");
    const status = await this.npc.gesture("shake");
    this.registerInfo(status);
  }
}

export { ShakeHeadAction as default };
