"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class LookAtPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.player;
    const bot = this.npc.getBot();
    const playerEntity = bot.players[player] && bot.players[player].entity;

    bag.logStepHeading(`Looking at player: ${player}...`);
    let status;
    if (playerEntity) {
      status = await this.npc.lookAtLocation(
        playerEntity.position.x,
        playerEntity.position.y + 1.6,
        playerEntity.position.z,
      );
    } else {
      status = await this.npc.sayMessage(`I cannot see you, ${player}`);
    }
    this.registerInfo(status);
  }
}

export { LookAtPlayerAction as default };
