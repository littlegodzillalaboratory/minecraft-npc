"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayChestContentsAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Saying chest contents...");
    const status = await this.npc.listChest();
    this.registerInfo(status);
  }
}

export { SayChestContentsAction as default };
