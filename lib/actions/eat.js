"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EatAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading(`Eating...`);
    const status = await this.npc.eat();
    this.registerInfo(status);
  }
}

export { EatAction as default };
