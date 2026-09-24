"use strict";
import BaseSkill from "./base.js";

class EatFoodSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const item = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.includes(itemName));

    if (!item) {
      return this.fail(`I do not have any ${opts.itemName}`);
    }

    await this.bot.equip(item, "hand");
    await this.bot.consume();
  }
}

export { EatFoodSkill as default };
