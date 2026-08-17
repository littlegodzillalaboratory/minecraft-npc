"use strict";
import BaseSkill from "./base.js";

const ANIMAL_FOODS = {
  cow: ["wheat"],
  sheep: ["wheat"],
  mooshroom: ["wheat"],
  pig: ["carrot", "potato", "beetroot"],
  chicken: ["wheat_seeds", "melon_seeds", "pumpkin_seeds", "beetroot_seeds"],
  horse: ["apple", "golden_apple", "sugar"],
  donkey: ["apple", "golden_apple", "sugar"],
  wolf: ["bone", "beef", "cooked_beef", "chicken", "cooked_chicken"],
  cat: ["cod", "salmon"],
  ocelot: ["cod", "salmon"],
  rabbit: ["carrot", "golden_carrot", "dandelion"],
};

class FeedAnimalSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.entityName.toLowerCase().replaceAll(" ", "_");
    const entity = this.bot.nearestEntity(
      (candidate) => candidate.name && candidate.name.includes(entityName),
    );

    if (!entity) {
      this.bot.chat(`I cannot find any ${opts.entityName} nearby`);
      return;
    }

    const foods = ANIMAL_FOODS[entity.name] || ["wheat"];
    const food = this.bot.inventory
      .items()
      .find((candidate) => foods.includes(candidate.name));

    if (!food) {
      this.bot.chat(`I have no food for the ${opts.entityName}`);
      return;
    }

    await this.bot.equip(food, "hand");
    await this.bot.useOn(entity);
  }
}

export { FeedAnimalSkill as default };
