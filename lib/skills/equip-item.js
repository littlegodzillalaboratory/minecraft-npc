"use strict";
import bag from "bagofcli";
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
      return this.fail(`I do not have any ${opts.itemName}`);
    }

    await this.bot.equip(item, opts.destination);
    bag.logStepItemSuccess(`Equipped ${item.name} on ${opts.destination}`);
  }
}

export { EquipItemSkill as default };
