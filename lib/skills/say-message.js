"use strict";
import BaseSkill from "./base.js";

class SayMessageSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.chat(opts.message);
  }
}

export { SayMessageSkill as default };
