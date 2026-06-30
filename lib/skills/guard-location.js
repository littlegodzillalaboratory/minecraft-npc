"use strict";
import BaseSkill from "./base.js";

class GuardLocationSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const GUARD_RADIUS = 30;
    const hostileEntity = Object.values(this.bot.entities).find((entity) => {
      if (entity.type !== "mob") return false;
      const def = this.bot.registry.entitiesByName[entity.name];
      if (!def || def.category !== "Hostile mobs") return false;
      const dx = entity.position.x - opts.posX;
      const dy = entity.position.y - opts.posY;
      const dz = entity.position.z - opts.posZ;
      return Math.sqrt(dx * dx + dy * dy + dz * dz) <= GUARD_RADIUS;
    });
    if (hostileEntity) {
      this.bot.pvp.attack(hostileEntity);
    }
  }
}

export { GuardLocationSkill as default };
