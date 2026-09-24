"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CountItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();
    const count = this.npc.countInventoryItem(itemName);

    bag.logStepHeading(`Counting item: ${itemName}...`);
    const status = await this.npc.sayMessage(`I have ${count} ${itemName}`);
    this.registerInfo(status);
  }
}

export { CountItemAction as default };
