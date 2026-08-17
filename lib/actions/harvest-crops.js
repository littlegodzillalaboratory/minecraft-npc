"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class HarvestCropsAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Harvesting crops...");
    const status = await this.npc.harvestCrops();
    this.registerInfo(status);
  }
}

export { HarvestCropsAction as default };
