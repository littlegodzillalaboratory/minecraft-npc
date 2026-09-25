"use strict";
import bag from "bagofcli";
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
      return this.fail(`I do not know how to craft ${opts.itemName}`);
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
      return this.fail(`I cannot craft ${opts.itemName} right now`);
    }

    await this.bot.craft(recipes[0], 1, craftingTable);
    bag.logStepItemSuccess(`Crafted ${opts.itemName}`);
    return this.inform(`I crafted ${opts.itemName}`);
  }
}

export { CraftItemSkill as default };
