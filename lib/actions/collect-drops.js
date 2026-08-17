"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CollectDropsAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Collecting dropped items...");
    const status = await this.npc.collectItems();
    this.registerInfo(status);
  }
}

export { CollectDropsAction as default };
