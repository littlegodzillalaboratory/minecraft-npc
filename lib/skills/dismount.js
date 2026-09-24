"use strict";
import BaseSkill from "./base.js";

class DismountSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    if (!this.bot.vehicle) {
      return this.fail("I am not riding anything");
    }

    this.bot.dismount();
  }
}

export { DismountSkill as default };
