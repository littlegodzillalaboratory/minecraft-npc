"use strict";
import BaseSkill from "./base.js";

class GetInventorySummarySkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return display-ready inventory entries without choosing chat wording. */
  do(opts) {
    return this.bot.inventory
      .items()
      .map((item) => `${item.name} x ${item.count}`);
  }
}

export { GetInventorySummarySkill as default };
