"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EquipArmorAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Equipping armor...");
    const status = await this.npc.equipArmor();
    this.registerInfo(status);
  }
}

export { EquipArmorAction as default };
