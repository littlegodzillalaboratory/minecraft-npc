"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class DismountAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Dismounting...");
    const status = await this.npc.dismount();
    this.registerInfo(status);
  }
}

export { DismountAction as default };
