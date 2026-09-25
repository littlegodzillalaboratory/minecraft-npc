"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class GiveItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const playerEntity =
      this.bot.players[opts.player] && this.bot.players[opts.player].entity;

    if (!playerEntity) {
      return this.fail(`I cannot see you, ${opts.player}`);
    }

    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const singular = itemName.replace(/e?s$/, "");
    const item = this.bot.inventory
      .items()
      .find(
        (candidate) =>
          candidate.name.includes(itemName) ||
          candidate.name.includes(singular),
      );

    if (!item) {
      return this.fail(`I do not have any ${opts.itemName}`);
    }

    await this.bot.lookAt(playerEntity.position.offset(0, 1.6, 0));
    await this.bot.toss(item.type, null, item.count);
    bag.logStepItemSuccess(`Gave ${item.count} ${item.name} to ${opts.player}`);
  }
}

export { GiveItemSkill as default };
