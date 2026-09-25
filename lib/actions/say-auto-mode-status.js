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
    const policy = autoMode.engine ? ` as ${autoMode.engine}` : "";
    const message = `Auto mode is ${state}${policy}; current goal: ${autoMode.currentGoal}`;
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayAutoModeStatusAction as default };
