"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ListInventoryAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();
    const items = bot.inventory.items();

    bag.logStepHeading("Listing inventory...");
    const message = items.length
      ? `I have: ${items.map((item) => `${item.name} x ${item.count}`).join(", ")}`
      : "My inventory is empty";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { ListInventoryAction as default };
