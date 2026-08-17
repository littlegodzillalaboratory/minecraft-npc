"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayArmorAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();
    const armorNames = [5, 6, 7, 8]
      .map((slot) => bot.inventory.slots[slot])
      .filter((item) => item)
      .map((item) => item.name);

    bag.logStepHeading("Saying armor...");
    const message = armorNames.length
      ? `I am wearing: ${armorNames.join(", ")}`
      : "I am not wearing any armor";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayArmorAction as default };
