"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class StopCurrentAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Stopping current activity...");
    const status = await this.npc.stop();
    this.registerInfo(status);
  }
}

export { StopCurrentAction as default };
