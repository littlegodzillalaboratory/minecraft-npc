"use strict";
import BaseSkill from "./base.js";

class DefendPlayerSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const DEFEND_RADIUS = 16;
    const playerEntity =
      this.bot.players[opts.player] && this.bot.players[opts.player].entity;

    if (!playerEntity) {
      return this.fail(`I cannot see you, ${opts.player}`);
    }

    const hostileEntity = Object.values(this.bot.entities).find((entity) => {
      const def = this.bot.registry.entitiesByName[entity.name];
      if (!def || def.category !== "Hostile mobs") return false;
      return entity.position.distanceTo(playerEntity.position) <= DEFEND_RADIUS;
    });

    if (hostileEntity) {
      this.bot.pvp.attack(hostileEntity);
    } else {
      return this.inform("You are safe, there are no threats nearby");
    }
  }
}

export { DefendPlayerSkill as default };
