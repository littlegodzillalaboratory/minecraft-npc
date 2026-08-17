"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class DepositToChestAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Depositing items to chest...");
    const status = await this.npc.depositToChest();
    this.registerInfo(status);
  }
}

export { DepositToChestAction as default };
