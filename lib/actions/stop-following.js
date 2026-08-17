"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class StopFollowingAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Stopping following...");
    const status = await this.npc.stop();
    this.registerInfo(status);
  }
}

export { StopFollowingAction as default };
