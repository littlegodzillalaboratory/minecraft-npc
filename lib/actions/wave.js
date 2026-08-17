"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class WaveAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Waving...");
    const status = await this.npc.swingArm();
    this.registerInfo(status);
  }
}

export { WaveAction as default };
