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
      this.bot.chat(`I cannot see you, ${opts.player}`);
      return;
    }

    const hostileEntity = Object.values(this.bot.entities).find((entity) => {
      if (entity.type !== "mob") return false;
      const def = this.bot.registry.entitiesByName[entity.name];
      if (!def || def.category !== "Hostile mobs") return false;
      return entity.position.distanceTo(playerEntity.position) <= DEFEND_RADIUS;
    });

    if (hostileEntity) {
      this.bot.pvp.attack(hostileEntity);
    } else {
      this.bot.chat("You are safe, there are no threats nearby");
    }
  }
}

export { DefendPlayerSkill as default };
