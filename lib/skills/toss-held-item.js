"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class TossHeldItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const item = this.bot.heldItem;

    if (!item) {
      return this.fail("I am not holding anything");
    }

    await this.bot.tossStack(item);
    bag.logStepItemSuccess(`Tossed ${item.name}`);
  }
}

export { TossHeldItemSkill as default };
