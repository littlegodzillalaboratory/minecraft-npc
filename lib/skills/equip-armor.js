"use strict";
import BaseSkill from "./base.js";

const ARMOR_DESTINATIONS = {
  helmet: "head",
  chestplate: "torso",
  leggings: "legs",
  boots: "feet",
};

class EquipArmorSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    let equippedCount = 0;

    for (const [suffix, destination] of Object.entries(ARMOR_DESTINATIONS)) {
      const item = this.bot.inventory
        .items()
        .find((candidate) => candidate.name.endsWith(suffix));

      if (item) {
        await this.bot.equip(item, destination);
        equippedCount += 1;
      }
    }

    if (equippedCount === 0) {
      this.bot.chat("I have no armor to wear");
    }
  }
}

export { EquipArmorSkill as default };
