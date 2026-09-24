"use strict";
import BaseSkill from "./base.js";

const FOOD_ANIMALS = ["cow", "pig", "chicken", "sheep", "rabbit"];

class HuntFoodSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const entity = this.bot.nearestEntity((candidate) =>
      FOOD_ANIMALS.includes(candidate.name),
    );

    if (!entity) {
      return this.fail("There is nothing to hunt nearby");
    }

    this.bot.pvp.attack(entity);
  }
}

export { HuntFoodSkill as default };
