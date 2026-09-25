"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

const CHEST_NAMES = ["chest", "trapped_chest", "barrel"];

class DepositToChestSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const chestIds = CHEST_NAMES.filter(
      (name) => this.bot.registry.blocksByName[name],
    ).map((name) => this.bot.registry.blocksByName[name].id);

    const chestBlock = this.bot.findBlock({
      matching: chestIds,
      maxDistance: 16,
    });

    if (!chestBlock) {
      return this.fail("There is no chest nearby");
    }

    const container = await this.bot.openContainer(chestBlock);

    for (const item of this.bot.inventory.items()) {
      await container.deposit(item.type, null, item.count);
    }

    container.close();
    bag.logStepItemSuccess("Deposited the inventory into the chest");
    return this.inform("I have deposited my items into the chest");
  }
}

export { DepositToChestSkill as default };
