"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayDistanceToPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.player;
    const bot = this.npc.getBot();
    const playerEntity = bot.players[player] && bot.players[player].entity;

    bag.logStepHeading(`Saying distance to player: ${player}...`);
    const message = playerEntity
      ? `You are ${Math.round(playerEntity.position.distanceTo(bot.entity.position))} blocks away from me`
      : `I cannot see you, ${player}`;
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayDistanceToPlayerAction as default };
