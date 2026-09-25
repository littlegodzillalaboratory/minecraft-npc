"use strict";
import bag from "bagofcli";
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
    const count = Object.values(this.bot.entities).filter((entity) => {
      return (
        entity.name?.includes(query) &&
        entity.position.distanceTo(this.bot.entity.position) <= opts.maxDistance
      );
    }).length;
    bag.logStepItemSuccess(`Matching entities counted: ${count}`);
    return count;
  }
}

export { CountEntitiesSkill as default };
