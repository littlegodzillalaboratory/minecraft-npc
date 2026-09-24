"use strict";
import BaseSkill from "./base.js";

class HuntFoodSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const entity = this.bot.nearestEntity((candidate) => {
      const allowed = opts.allowedAnimals.includes(candidate.name);
      const withinRange =
        candidate.position.distanceTo(this.bot.entity.position) <=
        opts.maximumDistance;
      const protectedAnimal =
        candidate.isBaby || candidate.customName || candidate.ownerUuid;
      return allowed && withinRange && !protectedAnimal;
    });

    if (!entity) {
      return this.fail("There is nothing to hunt nearby");
    }

    this.bot.pvp.attack(entity);
  }
}

export { HuntFoodSkill as default };
