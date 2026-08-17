"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MoveToCoordinatesAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const posX = Number.parseInt(opts.messageElems[1], 10);
    const posY = Number.parseInt(opts.messageElems[2], 10);
    const posZ = Number.parseInt(opts.messageElems[3], 10);

    bag.logStepHeading(`Moving to coordinates: ${posX} ${posY} ${posZ}...`);
    const status = await this.npc.moveToLocation(posX, posY, posZ);
    this.registerInfo(status);
  }
}

export { MoveToCoordinatesAction as default };
