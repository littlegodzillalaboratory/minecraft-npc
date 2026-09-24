"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class GoToPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.messageElems[1];
    const position = this.npc.getPlayerPosition(player);

    bag.logStepHeading(`Moving to player: ${player}...`);
    let status;
    if (position) {
      status = await this.npc.moveToLocation(
        position.x,
        position.y,
        position.z,
      );
    } else {
      status = await this.npc.sayMessage(`I cannot see ${player}`);
    }
    this.registerInfo(status);
  }
}

export { GoToPlayerAction as default };
