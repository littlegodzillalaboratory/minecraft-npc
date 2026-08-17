"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class BackAwayAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Backing away...");
    const status = await this.npc.moveBlocksDistanceToDirection(5, "backward");
    this.registerInfo(status);
  }
}

export { BackAwayAction as default };
