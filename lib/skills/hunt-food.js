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
      this.bot.chat("There is nothing to hunt nearby");
      return;
    }

    this.bot.pvp.attack(entity);
  }
}

export { HuntFoodSkill as default };
