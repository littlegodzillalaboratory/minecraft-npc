"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EatSpecificFoodAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();

    bag.logStepHeading(`Eating food: ${itemName}...`);
    const status = await this.npc.eatFood(itemName);
    this.registerInfo(status);
  }
}

export { EatSpecificFoodAction as default };
