"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class EatAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    bag.logStepHeading(`Eating...`);
    const status = this.npc.eat();
    this.registerInfo(status);
  }
}

export { EatAction as default };
