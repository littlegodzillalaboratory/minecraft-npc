"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class DigDownAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Digging down...");
    const status = await this.npc.digBlock("below");
    this.registerInfo(status);
  }
}

export { DigDownAction as default };
