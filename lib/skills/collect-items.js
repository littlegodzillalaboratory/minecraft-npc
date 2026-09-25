"use strict";
import bag from "bagofcli";
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

    const position = {
      posX: itemEntity.position.x,
      posY: itemEntity.position.y,
      posZ: itemEntity.position.z,
    };
    bag.logStepItemSuccess("Found the nearest dropped item");
    return position;
  }
}

export { CollectItemsSkill as default };
