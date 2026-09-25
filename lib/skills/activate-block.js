"use strict";
import bag from "bagofcli";
import pathfinder from "mineflayer-pathfinder";
import BaseSkill from "./base.js";

class ActivateBlockSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const blockName = opts.blockName.toLowerCase().replaceAll(" ", "_");
    const matchingBlockIds = Object.values(this.bot.registry.blocksByName)
      .filter((block) => block.name.includes(blockName))
      .map((block) => block.id);

    if (!matchingBlockIds.length) {
      return this.fail(`I do not know any block like ${opts.blockName}`);
    }

    const block = this.bot.findBlock({
      matching: matchingBlockIds,
      maxDistance: opts.maxDistance || 16,
    });

    if (!block) {
      return this.fail(`I cannot find any ${opts.blockName} nearby`);
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
    await this.bot.activateBlock(block);
    bag.logStepItemSuccess(`Activated ${block.name}`);
  }
}

export { ActivateBlockSkill as default };
