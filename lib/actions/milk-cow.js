"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MilkCowAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Milking cow...");
    const status = await this.npc.useItemOnEntity("bucket", "cow");
    this.registerInfo(status);
  }
}

export { MilkCowAction as default };
