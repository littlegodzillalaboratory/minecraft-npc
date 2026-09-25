"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class SwingArmSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.swingArm("right");
    bag.logStepItemSuccess("Swung the right arm");
  }
}

export { SwingArmSkill as default };
