"use strict";
import BaseSkill from "./base.js";

class GiveItemSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const playerEntity =
      this.bot.players[opts.player] && this.bot.players[opts.player].entity;

    if (!playerEntity) {
      this.bot.chat(`I cannot see you, ${opts.player}`);
      return;
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
      this.bot.chat(`I do not have any ${opts.itemName}`);
      return;
    }

    await this.bot.lookAt(playerEntity.position.offset(0, 1.6, 0));
    await this.bot.toss(item.type, null, item.count);
  }
}

export { GiveItemSkill as default };
