"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ReportThreatsAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const threatNames = this.npc.findNearbyThreats(30);

    bag.logStepHeading("Reporting threats...");
    const message = threatNames.length
      ? `Threats nearby: ${threatNames.join(", ")}`
      : "There are no threats nearby";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { ReportThreatsAction as default };
