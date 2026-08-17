"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ThrowEggAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Throwing egg...");
    const status = await this.npc.activateItem("egg");
    this.registerInfo(status);
  }
}

export { ThrowEggAction as default };
