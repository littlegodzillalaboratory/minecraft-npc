"use strict";
import bag from "bagofcli";
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
      return this.fail(`I cannot see you, ${opts.player}`);
    }

    const defaultMovement = new pathfinder.Movements(this.bot);
    this.bot.pathfinder.setMovements(defaultMovement);
    this.bot.pathfinder.setGoal(
      new pathfinder.goals.GoalFollow(playerEntity, 2),
      true,
    );
    bag.logStepItemSuccess(`Started following ${opts.player}`);
  }
}

export { FollowPlayerSkill as default };
