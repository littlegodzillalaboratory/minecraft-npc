"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ListInventoryAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const items = this.npc.getInventorySummary();

    bag.logStepHeading("Listing inventory...");
    const message = items.length
      ? `I have: ${items.join(", ")}`
      : "My inventory is empty";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { ListInventoryAction as default };
