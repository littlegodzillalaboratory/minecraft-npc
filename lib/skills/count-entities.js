"use strict";
import BaseSkill from "./base.js";

class CountEntitiesSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Count loaded entities matching a name or registry category. */
  do(opts) {
    const query = opts.entityName
      .toLowerCase()
      .replaceAll(" ", "_")
      .replace(/s$/, "");
    return Object.values(this.bot.entities).filter((entity) => {
      return (
        entity.name?.includes(query) &&
        entity.position.distanceTo(this.bot.entity.position) <= opts.maxDistance
      );
    }).length;
  }
}

export { CountEntitiesSkill as default };
