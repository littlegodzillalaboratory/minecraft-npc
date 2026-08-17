"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ChopTreeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Chopping tree...");
    const status = await this.npc.collectBlock("_log");
    this.registerInfo(status);
  }
}

export { ChopTreeAction as default };
