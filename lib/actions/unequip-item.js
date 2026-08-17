"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class UnequipItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Unequipping item...");
    const status = await this.npc.unequipItem();
    this.registerInfo(status);
  }
}

export { UnequipItemAction as default };
