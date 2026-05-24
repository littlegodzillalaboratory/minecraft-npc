"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class StopCurrentAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    bag.logStepHeading("Stopping current activity...");
    const status = this.npc.stop();
    this.registerInfo(status);
  }
}

export { StopCurrentAction as default };
