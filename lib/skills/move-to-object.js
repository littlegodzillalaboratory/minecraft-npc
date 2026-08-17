"use strict";
import BaseSkill from "./base.js";
import MoveToLocationSkill from "./move-to-location.js";

class MoveToObjectSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const objectName = opts.objectName.toLowerCase();
    const matchingBlockIds = Object.values(this.bot.registry.blocksByName)
      .filter((block) => block.name.includes(objectName))
      .map((block) => block.id);

    const block = this.bot.findBlock({
      matching: matchingBlockIds,
      maxDistance: opts.maxDistance || 64,
    });

    new MoveToLocationSkill(this.bot).do({
      posX: block.position.x,
      posY: block.position.y,
      posZ: block.position.z,
    });
  }
}

export { MoveToObjectSkill as default };
