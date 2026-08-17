"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MoveToPlayerLocationAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.player;
    const pos = this.npc.getPlayerPosition(player);
    const posX = pos.x;
    const posY = pos.y;
    const posZ = pos.z;

    bag.logStepHeading("Moving to player location...");
    const status = await this.npc.moveToLocation(posX, posY, posZ);
    this.registerInfo(status);
  }
}

export { MoveToPlayerLocationAction as default };
