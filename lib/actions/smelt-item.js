"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SmeltItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();

    bag.logStepHeading(`Smelting item: ${itemName}...`);
    const status = await this.npc.smeltItem(itemName);
    this.registerInfo(status);
  }
}

export { SmeltItemAction as default };
