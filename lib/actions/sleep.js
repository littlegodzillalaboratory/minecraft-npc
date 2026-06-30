"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SleepAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    bag.logStepHeading(`Sleeping...`);
    const status = this.npc.sleep();
    this.registerInfo(status);
  }
}

export { SleepAction as default };
