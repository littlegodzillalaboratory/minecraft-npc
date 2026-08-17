"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EquipShieldAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Equipping shield...");
    const status = await this.npc.equipItem("shield", "off-hand");
    this.registerInfo(status);
  }
}

export { EquipShieldAction as default };
