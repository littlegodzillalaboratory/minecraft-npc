"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MineTargetBlockAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Mining target block...");
    const status = await this.npc.digBlock("cursor");
    this.registerInfo(status);
  }
}

export { MineTargetBlockAction as default };
