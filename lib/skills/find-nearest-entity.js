"use strict";
import BaseSkill from "./base.js";

class FindNearestEntitySkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the nearest entity whose name matches the requested name. */
  do(opts) {
    const query = opts.entityName.toLowerCase().replaceAll(" ", "_");
    return this.bot.nearestEntity(
      (entity) => entity.name && entity.name.includes(query),
    );
  }
}

export { FindNearestEntitySkill as default };
