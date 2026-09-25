"use strict";
import bag from "bagofcli";
import { setTimeout } from "timers/promises";
import BaseSkill from "./base.js";

class DanceSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const stepInMillis =
      opts.stepInMillis !== undefined ? opts.stepInMillis : 300;
    const moves = ["jump", "sneak", "jump", "sneak"];

    for (const move of moves) {
      this.bot.setControlState(move, true);
      await setTimeout(stepInMillis);
      this.bot.setControlState(move, false);
      await setTimeout(stepInMillis);
    }
    bag.logStepItemSuccess("Finished dancing");
  }
}

export { DanceSkill as default };
