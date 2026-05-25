"use strict";
import BaseSkill from "./base.js";

class MoveToObjectSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const objectName = opts.objectName.toLowerCase();
    const matchingBlockIds = Object.values(this.bot.registry.blocksByName)
      .filter((block) => block.name.includes(objectName))
      .map((block) => block.id);

    if (!matchingBlockIds.length) {
      return undefined;
    }

    return this.bot.findBlock({
      matching: matchingBlockIds,
      maxDistance: opts.maxDistance || 64,
    });
  }
}

export { MoveToObjectSkill as default };