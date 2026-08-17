"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EquipItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();

    bag.logStepHeading(`Equipping item: ${itemName}...`);
    const status = await this.npc.equipItem(itemName, "hand");
    this.registerInfo(status);
  }
}

export { EquipItemAction as default };
