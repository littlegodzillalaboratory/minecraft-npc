"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class DropItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();

    bag.logStepHeading(`Dropping item: ${itemName}...`);
    const status = await this.npc.dropItem(itemName);
    this.registerInfo(status);
  }
}

export { DropItemAction as default };
