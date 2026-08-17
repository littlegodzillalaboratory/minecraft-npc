"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class StandDownAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Standing down...");
    const status = await this.npc.stop();
    this.registerInfo(status);
  }
}

export { StandDownAction as default };
