"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class GetEquippedArmorSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the names of items in Mineflayer's armor slots. */
  do(opts) {
    const armor = this.bot.inventory.slots
      .slice(5, 9)
      .filter(Boolean)
      .map((item) => item.name);
    bag.logStepItemSuccess(`Equipped armor pieces found: ${armor.length}`);
    return armor;
  }
}

export { GetEquippedArmorSkill as default };
