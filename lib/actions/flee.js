"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FleeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Fleeing...");
    const status = await this.npc.flee();
    this.registerInfo(status);
  }
}

export { FleeAction as default };
