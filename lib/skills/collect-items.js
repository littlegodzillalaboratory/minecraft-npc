"use strict";
import BaseSkill from "./base.js";
import MoveToLocationSkill from "./move-to-location.js";

class CollectItemsSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const itemEntity = this.bot.nearestEntity(
      (candidate) => candidate.name === "item",
    );

    if (!itemEntity) {
      this.bot.chat("There are no items to pick up nearby");
      return;
    }

    new MoveToLocationSkill(this.bot).do({
      posX: itemEntity.position.x,
      posY: itemEntity.position.y,
      posZ: itemEntity.position.z,
    });
  }
}

export { CollectItemsSkill as default };
