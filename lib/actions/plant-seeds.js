"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class PlantSeedsAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Planting seeds...");
    const status = await this.npc.plantSeeds();
    this.registerInfo(status);
  }
}

export { PlantSeedsAction as default };
