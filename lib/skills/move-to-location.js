"use strict";
import pathfinder from "mineflayer-pathfinder";
import BaseSkill from "./base.js";

class MoveToLocationSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const defaultMovement = new pathfinder.Movements(this.bot);
    this.bot.pathfinder.setMovements(defaultMovement);
    this.bot.pathfinder.setGoal(
      new pathfinder.goals.GoalNear(opts.posX, opts.posY, opts.posZ, 1),
    );
  }
}

export { MoveToLocationSkill as default };
