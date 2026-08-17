"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ShearSheepAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Shearing sheep...");
    const status = await this.npc.useItemOnEntity("shears", "sheep");
    this.registerInfo(status);
  }
}

export { ShearSheepAction as default };
