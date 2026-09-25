"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class FleeSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Calculate a destination away from the nearest threat. */
  do(opts) {
    const FLEE_DISTANCE = 16;
    const threat = this.bot.nearestEntity((candidate) => {
      const def = this.bot.registry.entitiesByName[candidate.name];
      return def !== undefined && def.category === "Hostile mobs";
    });

    if (!threat) {
      return this.fail("There is nothing to flee from");
    }

    const position = this.bot.entity.position;
    const dx = position.x - threat.position.x;
    const dz = position.z - threat.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz) || 1;
    const scale = FLEE_DISTANCE / distance;

    const destination = {
      posX: Math.round(position.x + dx * scale),
      posY: Math.round(position.y),
      posZ: Math.round(position.z + dz * scale),
    };
    bag.logStepItemSuccess(`Found an escape route from ${threat.name}`);
    return destination;
  }
}

export { FleeSkill as default };
