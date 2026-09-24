"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FindItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();
    const count = this.npc.countInventoryItem(itemName);

    bag.logStepHeading(`Finding item: ${itemName}...`);
    const message = count
      ? `Yes, I have ${count} ${itemName}`
      : `No, I do not have any ${itemName}`;
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { FindItemAction as default };
