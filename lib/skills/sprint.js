"use strict";
import { setTimeout } from "timers/promises";
import BaseSkill from "./base.js";

class SprintSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    this.bot.setControlState("sprint", true);
    this.bot.setControlState("forward", true);
    await setTimeout(
      opts.durationInMillis !== undefined ? opts.durationInMillis : 2000,
    );
    this.bot.setControlState("forward", false);
    this.bot.setControlState("sprint", false);
  }
}

export { SprintSkill as default };
