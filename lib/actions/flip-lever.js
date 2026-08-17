"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FlipLeverAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Flipping lever...");
    const status = await this.npc.activateBlock("lever");
    this.registerInfo(status);
  }
}

export { FlipLeverAction as default };
