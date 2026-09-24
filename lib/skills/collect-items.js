"use strict";
import BaseSkill from "./base.js";

class CollectItemsSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the nearest dropped item's position without moving the bot. */
  do(opts) {
    const itemEntity = this.bot.nearestEntity(
      (candidate) => candidate.name === "item",
    );

    if (!itemEntity) {
      return this.fail("There are no items to pick up nearby");
    }

    return {
      posX: itemEntity.position.x,
      posY: itemEntity.position.y,
      posZ: itemEntity.position.z,
    };
  }
}

export { CollectItemsSkill as default };
