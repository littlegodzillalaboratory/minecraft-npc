"use strict";
import BaseSkill from "./base.js";

class SwingArmSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.swingArm("right");
  }
}

export { SwingArmSkill as default };
