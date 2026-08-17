"use strict";
import BaseSkill from "./base.js";

const ANIMAL_FOODS = {
  cow: ["wheat"],
  sheep: ["wheat"],
  mooshroom: ["wheat"],
  pig: ["carrot", "potato", "beetroot"],
  chicken: ["wheat_seeds", "melon_seeds", "pumpkin_seeds", "beetroot_seeds"],
  horse: ["golden_apple", "golden_carrot"],
  wolf: ["beef", "cooked_beef", "chicken", "cooked_chicken"],
  cat: ["cod", "salmon"],
  rabbit: ["carrot", "golden_carrot", "dandelion"],
};

class BreedAnimalsSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const BREED_RADIUS = 16;
    const entityName = opts.entityName.toLowerCase().replaceAll(" ", "_");
    const animals = Object.values(this.bot.entities)
      .filter((entity) => {
        if (!entity.name || !entity.name.includes(entityName)) return false;
        return (
          entity.position.distanceTo(this.bot.entity.position) <= BREED_RADIUS
        );
      })
      .slice(0, 2);

    if (animals.length < 2) {
      this.bot.chat(`I cannot find two ${opts.entityName} to breed nearby`);
      return;
    }

    const foods = ANIMAL_FOODS[animals[0].name] || ["wheat"];
    const food = this.bot.inventory
      .items()
      .find((candidate) => foods.includes(candidate.name));

    if (!food) {
      this.bot.chat(`I have no food to breed the ${opts.entityName} with`);
      return;
    }

    await this.bot.equip(food, "hand");
    await this.bot.useOn(animals[0]);
    await this.bot.useOn(animals[1]);
  }
}

export { BreedAnimalsSkill as default };
