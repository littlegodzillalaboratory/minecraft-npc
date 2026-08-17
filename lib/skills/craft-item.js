"use strict";
import BaseSkill from "./base.js";

class CraftItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const singular = itemName.replace(/s$/, "");
    const itemDef =
      this.bot.registry.itemsByName[itemName] ||
      this.bot.registry.itemsByName[singular];

    if (!itemDef) {
      this.bot.chat(`I do not know how to craft ${opts.itemName}`);
      return;
    }

    const craftingTableDef = this.bot.registry.blocksByName.crafting_table;
    const craftingTable = craftingTableDef
      ? this.bot.findBlock({
          matching: [craftingTableDef.id],
          maxDistance: 16,
        })
      : null;

    const recipes = this.bot.recipesFor(itemDef.id, null, 1, craftingTable);

    if (!recipes || !recipes.length) {
      this.bot.chat(`I cannot craft ${opts.itemName} right now`);
      return;
    }

    await this.bot.craft(recipes[0], 1, craftingTable);
    this.bot.chat(`I crafted ${opts.itemName}`);
  }
}

export { CraftItemSkill as default };
