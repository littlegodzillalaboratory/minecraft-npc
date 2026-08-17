"use strict";
import BaseSkill from "./base.js";

class AttackPlayerSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const playerEntity =
      this.bot.players[opts.player] && this.bot.players[opts.player].entity;

    if (!playerEntity) {
      this.bot.chat(`I cannot see ${opts.player}`);
      return;
    }

    this.bot.pvp.attack(playerEntity);
  }
}

export { AttackPlayerSkill as default };
