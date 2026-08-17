"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CloseDoorAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Closing door...");
    const status = await this.npc.activateBlock("door");
    this.registerInfo(status);
  }
}

export { CloseDoorAction as default };
