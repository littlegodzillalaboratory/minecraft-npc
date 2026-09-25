"use strict";
import bag from "bagofcli";
import { setTimeout } from "timers/promises";
import BaseSkill from "./base.js";

class JumpSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    this.bot.setControlState("jump", true);
    await setTimeout(
      opts.durationInMillis !== undefined ? opts.durationInMillis : 500,
    );
    this.bot.setControlState("jump", false);
    bag.logStepItemSuccess("Finished jumping");
  }
}

export { JumpSkill as default };
