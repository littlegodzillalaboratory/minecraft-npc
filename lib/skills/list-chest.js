"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

const CHEST_NAMES = ["chest", "trapped_chest", "barrel"];

class ListChestSkill extends BaseSkill {
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
    const items = container.containerItems();
    const message = items.length
      ? `The chest contains: ${items.map((item) => `${item.name} x ${item.count}`).join(", ")}`
      : "The chest is empty";
    container.close();
    bag.logStepItemSuccess(`Chest item stacks listed: ${items.length}`);
    return this.inform(message);
  }
}

export { ListChestSkill as default };
