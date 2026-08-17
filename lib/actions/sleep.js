"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SleepAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading(`Sleeping...`);
    const status = await this.npc.sleep();
    this.registerInfo(status);
  }
}

export { SleepAction as default };
