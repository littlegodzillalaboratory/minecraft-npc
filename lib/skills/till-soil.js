"use strict";
import pathfinder from "mineflayer-pathfinder";
import BaseSkill from "./base.js";

class TillSoilSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const hoe = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.endsWith("_hoe"));

    if (!hoe) {
      this.bot.chat("I have no hoe to till with");
      return;
    }

    const tillableIds = ["grass_block", "dirt"]
      .filter((name) => this.bot.registry.blocksByName[name])
      .map((name) => this.bot.registry.blocksByName[name].id);

    const block = this.bot.findBlock({
      matching: tillableIds,
      maxDistance: 32,
      useExtraInfo: (candidate) => {
        const above = this.bot.blockAt(candidate.position.offset(0, 1, 0));
        return above !== null && above.name === "air";
      },
    });

    if (!block) {
      this.bot.chat("There is no ground to till nearby");
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
    await this.bot.equip(hoe, "hand");
    await this.bot.activateBlock(block);
  }
}

export { TillSoilSkill as default };
