"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class TillSoilAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Tilling soil...");
    const status = await this.npc.tillSoil();
    this.registerInfo(status);
  }
}

export { TillSoilAction as default };
