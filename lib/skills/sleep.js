"use strict";
import BaseSkill from "./base.js";

class SleepSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bedBlockIds = Object.keys(this.bot.registry.blocksByName)
      .filter((name) => name.endsWith("_bed"))
      .map((name) => this.bot.registry.blocksByName[name].id);

    const bed = this.bot.findBlock({
      matching: bedBlockIds,
      maxDistance: 32,
    });

    // bot.sleep() itself validates time-of-day/thunderstorm, occupied bed,
    // distance, and nearby monsters, throwing a descriptive error for each
    await this.bot.sleep(bed);
  }
}

export { SleepSkill as default };
