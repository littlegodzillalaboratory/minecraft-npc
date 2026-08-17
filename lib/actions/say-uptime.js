"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayUptimeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const minutes = Math.round(process.uptime() / 60);

    bag.logStepHeading("Saying uptime...");
    const status = await this.npc.sayMessage(
      `I have been online for about ${minutes} minutes`,
    );
    this.registerInfo(status);
  }
}

export { SayUptimeAction as default };
