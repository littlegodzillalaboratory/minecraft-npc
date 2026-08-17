"use strict";
import BaseSkill from "./base.js";

class EquipItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const item = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.includes(itemName));

    if (!item) {
      this.bot.chat(`I do not have any ${opts.itemName}`);
      return;
    }

    await this.bot.equip(item, opts.destination);
  }
}

export { EquipItemSkill as default };
