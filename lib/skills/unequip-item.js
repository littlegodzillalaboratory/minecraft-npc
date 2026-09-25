"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class UnequipItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    await this.bot.unequip("hand");
    bag.logStepItemSuccess("Unequipped the held item");
  }
}

export { UnequipItemSkill as default };
