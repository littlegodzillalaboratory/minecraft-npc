"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class FindNearestEntitySkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the nearest entity whose name matches the requested name. */
  do(opts) {
    const query = opts.entityName.toLowerCase().replaceAll(" ", "_");
    const entity = this.bot.nearestEntity(
      (entity) => entity.name && entity.name.includes(query),
    );
    bag.logStepItemSuccess(
      entity
        ? `Found the nearest ${entity.name}`
        : `Found no ${opts.entityName}`,
    );
    return entity;
  }
}

export { FindNearestEntitySkill as default };
