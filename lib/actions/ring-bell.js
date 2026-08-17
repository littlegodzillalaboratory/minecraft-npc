"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class RingBellAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Ringing bell...");
    const status = await this.npc.activateBlock("bell");
    this.registerInfo(status);
  }
}

export { RingBellAction as default };
