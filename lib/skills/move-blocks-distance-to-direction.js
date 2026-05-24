"use strict";
import pathfinder from "mineflayer-pathfinder";
import BaseSkill from "./base.js";

class MoveBlocksDistanceToDirectionSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const defaultMovement = new pathfinder.Movements(this.bot);
    this.bot.pathfinder.setMovements(defaultMovement);

    const currentPosition = this.bot.entity.position;
    const targetPosition = this._getTargetPosition(
      currentPosition,
      opts.distance,
      opts.direction,
    );

    this.bot.pathfinder.setGoal(
      new pathfinder.goals.GoalNear(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        1,
      ),
    );
  }

  _getTargetPosition(position, distance, direction) {
    const yaw = this.bot.entity.yaw;
    let dx = 0;
    let dy = 0;
    let dz = 0;

    if (direction === "forward") {
      dx = -Math.sin(yaw) * distance;
      dz = Math.cos(yaw) * distance;
    } else if (direction === "backward") {
      dx = Math.sin(yaw) * distance;
      dz = -Math.cos(yaw) * distance;
    } else if (direction === "leftward") {
      dx = -Math.cos(yaw) * distance;
      dz = -Math.sin(yaw) * distance;
    } else if (direction === "rightward") {
      dx = Math.cos(yaw) * distance;
      dz = Math.sin(yaw) * distance;
    } else if (direction === "downward") {
      dy = -distance;
    } else if (direction === "upward") {
      dy = distance;
    }

    return position.offset(Math.round(dx), Math.round(dy), Math.round(dz));
  }
}

export { MoveBlocksDistanceToDirectionSkill as default };