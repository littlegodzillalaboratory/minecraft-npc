"use strict";
import pathfinder from "mineflayer-pathfinder";
import BaseSkill from "./base.js";

const CROP_MATURE_METADATA = {
  wheat: 7,
  carrots: 7,
  potatoes: 7,
  beetroots: 3,
};

class HarvestCropsSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const cropIds = Object.keys(CROP_MATURE_METADATA)
      .filter((name) => this.bot.registry.blocksByName[name])
      .map((name) => this.bot.registry.blocksByName[name].id);

    const block = this.bot.findBlock({
      matching: cropIds,
      maxDistance: 32,
      useExtraInfo: (candidate) =>
        candidate.metadata >= CROP_MATURE_METADATA[candidate.name],
    });

    if (!block) {
      this.bot.chat("There are no crops ready to harvest nearby");
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
    await this.bot.dig(block);
  }
}

export { HarvestCropsSkill as default };
