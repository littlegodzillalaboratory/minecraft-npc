"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class PressButtonAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Pressing button...");
    const status = await this.npc.activateBlock("button");
    this.registerInfo(status);
  }
}

export { PressButtonAction as default };
