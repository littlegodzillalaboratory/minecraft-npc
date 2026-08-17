"use strict";
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
  }
}

export { JumpSkill as default };
