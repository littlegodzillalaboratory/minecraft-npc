"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayArmorAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const armorNames = this.npc.getEquippedArmor();

    bag.logStepHeading("Saying armor...");
    const message = armorNames.length
      ? `I am wearing: ${armorNames.join(", ")}`
      : "I am not wearing any armor";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayArmorAction as default };
