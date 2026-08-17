"use strict";
import BaseSkill from "./base.js";
import MoveToLocationSkill from "./move-to-location.js";

class FleeSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const FLEE_DISTANCE = 16;
    const threat = this.bot.nearestEntity((candidate) => {
      if (candidate.type !== "mob") return false;
      const def = this.bot.registry.entitiesByName[candidate.name];
      return def !== undefined && def.category === "Hostile mobs";
    });

    if (!threat) {
      this.bot.chat("There is nothing to flee from");
      return;
    }

    const position = this.bot.entity.position;
    const dx = position.x - threat.position.x;
    const dz = position.z - threat.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz) || 1;
    const scale = FLEE_DISTANCE / distance;

    new MoveToLocationSkill(this.bot).do({
      posX: Math.round(position.x + dx * scale),
      posY: Math.round(position.y),
      posZ: Math.round(position.z + dz * scale),
    });
  }
}

export { FleeSkill as default };
