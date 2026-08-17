"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class HuntFoodAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Hunting for food...");
    const status = await this.npc.huntFood();
    this.registerInfo(status);
  }
}

export { HuntFoodAction as default };
