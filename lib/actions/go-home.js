"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class GoHomeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const [posX, posY, posZ] = this.npc.getOpts().initCoords || [0, 0, 0];

    bag.logStepHeading(`Moving to home location: ${posX} ${posY} ${posZ}...`);
    const status = await this.npc.moveToLocation(posX, posY, posZ);
    this.registerInfo(status);
  }
}

export { GoHomeAction as default };
