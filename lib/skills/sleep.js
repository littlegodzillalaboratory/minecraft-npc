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

    if (!bed) {
      this.bot.chat("There is no bed nearby.");
      return;
    }

    await this.bot.sleep(bed);
  }
}

export { SleepSkill as default };
