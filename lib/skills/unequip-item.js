"use strict";
import BaseSkill from "./base.js";

class UnequipItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    await this.bot.unequip("hand");
  }
}

export { UnequipItemSkill as default };
