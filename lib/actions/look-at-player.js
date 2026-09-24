"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class LookAtPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.player;
    const position = this.npc.getPlayerPosition(player);

    bag.logStepHeading(`Looking at player: ${player}...`);
    let status;
    if (position) {
      status = await this.npc.lookAtLocation(
        position.x,
        position.y + 1.6,
        position.z,
      );
    } else {
      status = await this.npc.sayMessage(`I cannot see you, ${player}`);
    }
    this.registerInfo(status);
  }
}

export { LookAtPlayerAction as default };
