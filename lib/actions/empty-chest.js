"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EmptyChestAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Emptying chest...");
    const status = await this.npc.withdrawAllFromChest();
    this.registerInfo(status);
  }
}

export { EmptyChestAction as default };
