"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class BuildPillarAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const height = Number.parseInt(opts.messageElems[1], 10) || 3;

    bag.logStepHeading(`Building pillar of height: ${height}...`);
    const status = await this.npc.buildPillar(height);
    this.registerInfo(status);
  }
}

export { BuildPillarAction as default };
