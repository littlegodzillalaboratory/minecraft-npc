"use strict";
import BaseSkill from "./base.js";

class DropItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const singular = itemName.replace(/e?s$/, "");
    const item = this.bot.inventory
      .items()
      .find(
        (candidate) =>
          candidate.name.includes(itemName) ||
          candidate.name.includes(singular),
      );

    if (!item) {
      return this.fail(`I do not have any ${opts.itemName}`);
    }

    await this.bot.toss(item.type, null, item.count);
  }
}

export { DropItemSkill as default };
