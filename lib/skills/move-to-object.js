"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class MoveToObjectSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Locate an object and return its position without moving the bot. */
  do(opts) {
    const objectName = opts.objectName.toLowerCase();
    const matchingBlockIds = Object.values(this.bot.registry.blocksByName)
      .filter((block) => block.name.includes(objectName))
      .map((block) => block.id);

    const block = this.bot.findBlock({
      matching: matchingBlockIds,
      maxDistance: opts.maxDistance || 64,
    });

    if (!block) {
      return this.fail(`I cannot find any ${opts.objectName} nearby`);
    }

    const position = {
      posX: block.position.x,
      posY: block.position.y,
      posZ: block.position.z,
    };
    bag.logStepItemSuccess(`Found the nearest ${opts.objectName}`);
    return position;
  }
}

export { MoveToObjectSkill as default };
