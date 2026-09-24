"use strict";
import bag from "bagofcli";
import BaseAction from "./base.js";

class EnableAutoModeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Enabling auto mode...");
    const status = await this.npc.enableAutoMode();
    this.registerInfo(status);
  }
}

export { EnableAutoModeAction as default };
