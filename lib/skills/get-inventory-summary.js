"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class GetInventorySummarySkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return display-ready inventory entries without choosing chat wording. */
  do(opts) {
    const inventory = this.bot.inventory
      .items()
      .map((item) => `${item.name} x ${item.count}`);
    bag.logStepItemSuccess(`Inventory stacks summarised: ${inventory.length}`);
    return inventory;
  }
}

export { GetInventorySummarySkill as default };
