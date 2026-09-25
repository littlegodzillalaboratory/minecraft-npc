"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class CountInventoryItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the total inventory count for an item name. */
  do(opts) {
    const query = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const singular = query.replace(/e?s$/, "");
    const count = this.bot.inventory
      .items()
      .filter(
        (item) => item.name.includes(query) || item.name.includes(singular),
      )
      .reduce((total, item) => total + item.count, 0);
    bag.logStepItemSuccess(`Matching inventory items counted: ${count}`);
    return count;
  }
}

export { CountInventoryItemSkill as default };
