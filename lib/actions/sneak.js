"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SneakAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Sneaking...");
    const status = await this.npc.sneak(true);
    this.registerInfo(status);
  }
}

export { SneakAction as default };
