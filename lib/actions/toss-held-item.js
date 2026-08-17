"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class TossHeldItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Tossing held item...");
    const status = await this.npc.tossHeldItem();
    this.registerInfo(status);
  }
}

export { TossHeldItemAction as default };
