"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class GoToPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.messageElems[1];
    const bot = this.npc.getBot();
    const playerEntity = bot.players[player] && bot.players[player].entity;

    bag.logStepHeading(`Moving to player: ${player}...`);
    let status;
    if (playerEntity) {
      status = await this.npc.moveToLocation(
        playerEntity.position.x,
        playerEntity.position.y,
        playerEntity.position.z,
      );
    } else {
      status = await this.npc.sayMessage(`I cannot see ${player}`);
    }
    this.registerInfo(status);
  }
}

export { GoToPlayerAction as default };
