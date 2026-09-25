"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class SneakSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.setControlState("sneak", opts.enable);
    bag.logStepItemSuccess(
      opts.enable ? "Started sneaking" : "Stopped sneaking",
    );
  }
}

export { SneakSkill as default };
