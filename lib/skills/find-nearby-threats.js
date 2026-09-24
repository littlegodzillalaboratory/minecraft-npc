"use strict";
import BaseSkill from "./base.js";

class FindNearbyThreatsSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return hostile mob names within the requested distance. */
  do(opts) {
    return Object.values(this.bot.entities)
      .filter((entity) => {
        const definition = this.bot.registry.entitiesByName[entity.name];
        return (
          definition?.category === "Hostile mobs" &&
          entity.position.distanceTo(this.bot.entity.position) <=
            opts.maxDistance
        );
      })
      .map((entity) => entity.name);
  }
}

export { FindNearbyThreatsSkill as default };
