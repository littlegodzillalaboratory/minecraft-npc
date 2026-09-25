"use strict";
import bag from "bagofcli";
import BaseAction from "./base.js";

class DisableAutoModeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const engineName = this.npc.getAutoModeStatus().engine;
    bag.logStepHeading(`Disabling auto mode as ${engineName}...`);
    const status = await this.npc.disableAutoMode();
    this.registerInfo(status);
  }
}

export { DisableAutoModeAction as default };
