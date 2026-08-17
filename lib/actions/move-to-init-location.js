"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MoveToInitLocationAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const posX = opts.posX;
    const posY = opts.posY;
    const posZ = opts.posZ;

    bag.logStepHeading("Moving to initial location...");
    const status = await this.npc.moveToLocation(posX, posY, posZ);
    this.registerInfo(status);
  }
}

export { MoveToInitLocationAction as default };
