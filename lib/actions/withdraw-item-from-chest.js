"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class WithdrawItemFromChestAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();

    bag.logStepHeading(`Withdrawing item from chest: ${itemName}...`);
    const status = await this.npc.withdrawFromChest(itemName);
    this.registerInfo(status);
  }
}

export { WithdrawItemFromChestAction as default };
