"use strict";
import pathfinder from "mineflayer-pathfinder";
import BaseSkill from "./base.js";

class CollectBlockSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const blockName = opts.blockName.toLowerCase().replaceAll(" ", "_");
    const matchingBlockIds = Object.values(this.bot.registry.blocksByName)
      .filter((block) => block.name.includes(blockName))
      .map((block) => block.id);

    if (!matchingBlockIds.length) {
      this.bot.chat(`I do not know any block like ${opts.blockName}`);
      return;
    }

    const block = this.bot.findBlock({
      matching: matchingBlockIds,
      maxDistance: opts.maxDistance || 32,
    });

    if (!block) {
      this.bot.chat(`I cannot find any ${opts.blockName} nearby`);
      return;
    }

    const defaultMovement = new pathfinder.Movements(this.bot);
    this.bot.pathfinder.setMovements(defaultMovement);
    await this.bot.pathfinder.goto(
      new pathfinder.goals.GoalNear(
        block.position.x,
        block.position.y,
        block.position.z,
        2,
      ),
    );

    if (this.bot.canDigBlock(block)) {
      await this.bot.dig(block);
    } else {
      this.bot.chat(`I cannot dig ${block.name}`);
    }
  }
}

export { CollectBlockSkill as default };
