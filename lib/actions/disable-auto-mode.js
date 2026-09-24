"use strict";
import bag from "bagofcli";
import BaseAction from "./base.js";

class DisableAutoModeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Disabling auto mode...");
    const status = await this.npc.disableAutoMode();
    this.registerInfo(status);
  }
}

export { DisableAutoModeAction as default };
