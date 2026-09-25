"use strict";
import bag from "bagofcli";
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
      return this.fail("There is no furnace nearby");
    }

    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const input = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.includes(itemName));

    if (!input) {
      return this.fail(`I do not have any ${opts.itemName}`);
    }

    const fuel = this.bot.inventory
      .items()
      .find((candidate) => FUEL_NAMES.includes(candidate.name));

    if (!fuel) {
      return this.fail("I have no fuel to smelt with");
    }

    const furnace = await this.bot.openFurnace(furnaceBlock);
    await furnace.putFuel(fuel.type, null, fuel.count);
    await furnace.putInput(input.type, null, input.count);
    furnace.close();
    bag.logStepItemSuccess(`Started smelting ${input.name}`);
  }
}

export { SmeltItemSkill as default };
