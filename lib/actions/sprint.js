"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SprintAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Sprinting...");
    const status = await this.npc.sprint();
    this.registerInfo(status);
  }
}

export { SprintAction as default };
