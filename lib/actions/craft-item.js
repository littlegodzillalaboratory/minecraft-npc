"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CraftItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();

    bag.logStepHeading(`Crafting item: ${itemName}...`);
    const status = await this.npc.craftItem(itemName);
    this.registerInfo(status);
  }
}

export { CraftItemAction as default };
