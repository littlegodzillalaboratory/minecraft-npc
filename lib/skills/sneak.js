"use strict";
import BaseSkill from "./base.js";

class SneakSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.setControlState("sneak", opts.enable);
  }
}

export { SneakSkill as default };
