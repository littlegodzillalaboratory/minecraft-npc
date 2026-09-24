"use strict";
import bag from "bagofcli";
import BaseAction from "./base.js";

class SayAutoModeStatusAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Reporting auto mode status...");
    const autoMode = this.npc.getAutoModeStatus();
    const state = autoMode.enabled ? "enabled" : "disabled";
    const message = `Auto mode is ${state}; current goal: ${autoMode.currentGoal}`;
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayAutoModeStatusAction as default };
