"use strict";
import BaseSkill from "./base.js";

class GetEquippedArmorSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the names of items in Mineflayer's armor slots. */
  do(opts) {
    return this.bot.inventory.slots
      .slice(5, 9)
      .filter(Boolean)
      .map((item) => item.name);
  }
}

export { GetEquippedArmorSkill as default };
