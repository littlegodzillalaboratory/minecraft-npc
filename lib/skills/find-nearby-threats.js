"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class FindNearbyThreatsSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return hostile mob names within the requested distance. */
  do(opts) {
    const threats = Object.values(this.bot.entities)
      .filter((entity) => {
        const definition = this.bot.registry.entitiesByName[entity.name];
        return (
          definition?.category === "Hostile mobs" &&
          entity.position.distanceTo(this.bot.entity.position) <=
            opts.maxDistance
        );
      })
      .map((entity) => entity.name);
    bag.logStepItemSuccess(`Nearby threats found: ${threats.length}`);
    return threats;
  }
}

export { FindNearbyThreatsSkill as default };
