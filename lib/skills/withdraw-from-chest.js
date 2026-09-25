"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

const CHEST_NAMES = ["chest", "trapped_chest", "barrel"];

class WithdrawFromChestSkill extends BaseSkill {
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
    let items = container.containerItems();

    if (opts.itemName) {
      const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
      items = items.filter((item) => item.name.includes(itemName));
    }

    if (!items.length) {
      const description = opts.itemName ? opts.itemName : "items";
      container.close();
      return this.fail(`The chest has no ${description}`);
    }

    for (const item of items) {
      await container.withdraw(item.type, null, item.count);
    }

    container.close();
    bag.logStepItemSuccess(
      `Item stacks withdrawn from the chest: ${items.length}`,
    );
  }
}

export { WithdrawFromChestSkill as default };
