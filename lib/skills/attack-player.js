"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class AttackPlayerSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const playerEntity =
      this.bot.players[opts.player] && this.bot.players[opts.player].entity;

    if (!playerEntity) {
      return this.fail(`I cannot see ${opts.player}`);
    }

    this.bot.pvp.attack(playerEntity);
    bag.logStepItemSuccess(`Started attacking ${opts.player}`);
  }
}

export { AttackPlayerSkill as default };
