"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayDistanceToPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.player;
    const distance = this.npc.getPlayerDistance(player);

    bag.logStepHeading(`Saying distance to player: ${player}...`);
    const message =
      distance !== null
        ? `You are ${Math.round(distance)} blocks away from me`
        : `I cannot see you, ${player}`;
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayDistanceToPlayerAction as default };
