"use strict";
import BaseSkill from "./base.js";

class EatSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const foodItems = this.bot.inventory.items().filter((item) =>
      this.bot.registry.foodsByName[item.name] !== undefined
    );

    if (foodItems.length === 0) {
      this.bot.chat("I have no food.");
      return;
    }

    const bestFood = foodItems.sort((a, b) => {
      const aPoints = this.bot.registry.foodsByName[a.name].foodPoints;
      const bPoints = this.bot.registry.foodsByName[b.name].foodPoints;
      return bPoints - aPoints;
    })[0];

    await this.bot.equip(bestFood, "hand");
    await this.bot.consume();
  }
}

export { EatSkill as default };
