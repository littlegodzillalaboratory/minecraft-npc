"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

const MOVE_BLOCKS_DISTANCE_TO_DIRECTION_REGEX =
  /^move\s+(\d+)\s+blocks\s+(forward|backward|leftward|rightward|downward|upward)$/;

class MoveBlocksDistanceToDirectionAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const match = opts.message.toLowerCase().match(MOVE_BLOCKS_DISTANCE_TO_DIRECTION_REGEX);

    if (!match) {
      this.registerInfo("failed");
      return;
    }

    const distance = Number.parseInt(match[1], 10);
    const direction = match[2];

    bag.logStepHeading(
      `Move blocks distance to direction: ${distance} ${direction}...`,
    );
    const status = this.npc.moveBlocksDistanceToDirection(distance, direction);
    this.registerInfo(status);
  }
}

export { MoveBlocksDistanceToDirectionAction as default };