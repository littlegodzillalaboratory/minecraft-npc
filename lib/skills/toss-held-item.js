"use strict";
import BaseSkill from "./base.js";

class TossHeldItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const item = this.bot.heldItem;

    if (!item) {
      this.bot.chat("I am not holding anything");
      return;
    }

    await this.bot.tossStack(item);
  }
}

export { TossHeldItemSkill as default };
