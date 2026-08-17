"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EmptyInventoryAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Emptying inventory...");
    const status = await this.npc.emptyInventory();
    this.registerInfo(status);
  }
}

export { EmptyInventoryAction as default };
