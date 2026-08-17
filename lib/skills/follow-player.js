"use strict";
import pathfinder from "mineflayer-pathfinder";
import BaseSkill from "./base.js";

class FollowPlayerSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const playerEntity =
      this.bot.players[opts.player] && this.bot.players[opts.player].entity;

    if (!playerEntity) {
      this.bot.chat(`I cannot see you, ${opts.player}`);
      return;
    }

    const defaultMovement = new pathfinder.Movements(this.bot);
    this.bot.pathfinder.setMovements(defaultMovement);
    this.bot.pathfinder.setGoal(
      new pathfinder.goals.GoalFollow(playerEntity, 2),
      true,
    );
  }
}

export { FollowPlayerSkill as default };
