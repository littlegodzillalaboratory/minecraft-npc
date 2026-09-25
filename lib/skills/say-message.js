"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class SayMessageSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.chat(opts.message);
    bag.logStepItemSuccess("Said the message");
  }
}

export { SayMessageSkill as default };
