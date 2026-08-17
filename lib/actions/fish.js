"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FishAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Fishing...");
    const status = await this.npc.fish();
    this.registerInfo(status);
  }
}

export { FishAction as default };
