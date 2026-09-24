"use strict";
import BaseSkill from "./base.js";

class FindNearestAllowedAnimalSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the nearest huntable adult animal permitted by policy. */
  do(opts) {
    return this.bot.nearestEntity((entity) => {
      const allowed = opts.allowedAnimals.includes(entity.name);
      const withinRange =
        entity.position.distanceTo(this.bot.entity.position) <=
        opts.maximumDistance;
      const protectedAnimal =
        entity.isBaby || entity.customName || entity.ownerUuid;
      return allowed && withinRange && !protectedAnimal;
    });
  }
}

export { FindNearestAllowedAnimalSkill as default };
