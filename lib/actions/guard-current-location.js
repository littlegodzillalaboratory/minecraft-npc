"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class GuardCurrentLocationAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const pos = this.npc.getPosition();
    const posX = pos.x;
    const posY = pos.y;
    const posZ = pos.z;

    bag.logStepHeading("Guarding current location...");
    const status = await this.npc.guardLocation(posX, posY, posZ);
    this.registerInfo(status);
  }
}

export { GuardCurrentLocationAction as default };
