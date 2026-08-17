"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class OpenDoorAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Opening door...");
    const status = await this.npc.activateBlock("door");
    this.registerInfo(status);
  }
}

export { OpenDoorAction as default };
