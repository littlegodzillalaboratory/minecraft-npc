"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class AttackPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.messageElems[1];

    bag.logStepHeading(`Attacking player: ${player}...`);
    const status = await this.npc.attackPlayer(player);
    this.registerInfo(status);
  }
}

export { AttackPlayerAction as default };
