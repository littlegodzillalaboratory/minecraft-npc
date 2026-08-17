"use strict";
import BaseSkill from "./base.js";

class DismountSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    if (!this.bot.vehicle) {
      this.bot.chat("I am not riding anything");
      return;
    }

    this.bot.dismount();
  }
}

export { DismountSkill as default };
