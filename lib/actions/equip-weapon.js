"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EquipWeaponAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Equipping weapon...");
    const status = await this.npc.equipItem("sword", "hand");
    this.registerInfo(status);
  }
}

export { EquipWeaponAction as default };
