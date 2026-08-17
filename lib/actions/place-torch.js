"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class PlaceTorchAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Placing torch...");
    const status = await this.npc.placeBlock("torch");
    this.registerInfo(status);
  }
}

export { PlaceTorchAction as default };
