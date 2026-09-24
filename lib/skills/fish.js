"use strict";
import BaseSkill from "./base.js";

class FishSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const rod = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.includes("fishing_rod"));

    if (!rod) {
      return this.fail("I have no fishing rod");
    }

    await this.bot.equip(rod, "hand");
    await this.bot.fish();
    return this.inform("I caught something!");
  }
}

export { FishSkill as default };
