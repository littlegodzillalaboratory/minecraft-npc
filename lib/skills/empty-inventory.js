"use strict";
import bag from "bagofcli";
import { setTimeout } from "timers/promises";
import BaseSkill from "./base.js";

class EmptyInventorySkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    for (const item of this.bot.inventory.items()) {
      this.bot.tossStack(item);
      // Space tosses out so the server can process each inventory update.
      await setTimeout(500);
    }
    bag.logStepItemSuccess("Emptied the inventory");
  }
}

export { EmptyInventorySkill as default };
