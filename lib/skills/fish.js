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
      this.bot.chat("I have no fishing rod");
      return;
    }

    await this.bot.equip(rod, "hand");
    await this.bot.fish();
    this.bot.chat("I caught something!");
  }
}

export { FishSkill as default };
