"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CollectDropsAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Collecting dropped items...");
    const destination = await this.npc.collectItems();
    const outcome = await this.moveToOutcome(destination);
    this.registerInfo(outcome);
  }
}

export { CollectDropsAction as default };
