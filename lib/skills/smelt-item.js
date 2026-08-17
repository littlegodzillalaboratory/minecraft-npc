"use strict";
import BaseSkill from "./base.js";

const FUEL_NAMES = ["coal", "charcoal", "coal_block"];

class SmeltItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const furnaceDef = this.bot.registry.blocksByName.furnace;
    const furnaceBlock = furnaceDef
      ? this.bot.findBlock({ matching: [furnaceDef.id], maxDistance: 16 })
      : null;

    if (!furnaceBlock) {
      this.bot.chat("There is no furnace nearby");
      return;
    }

    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const input = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.includes(itemName));

    if (!input) {
      this.bot.chat(`I do not have any ${opts.itemName}`);
      return;
    }

    const fuel = this.bot.inventory
      .items()
      .find((candidate) => FUEL_NAMES.includes(candidate.name));

    if (!fuel) {
      this.bot.chat("I have no fuel to smelt with");
      return;
    }

    const furnace = await this.bot.openFurnace(furnaceBlock);
    await furnace.putFuel(fuel.type, null, fuel.count);
    await furnace.putInput(input.type, null, input.count);
    furnace.close();
  }
}

export { SmeltItemSkill as default };
