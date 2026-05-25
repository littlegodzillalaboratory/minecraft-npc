"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MoveBlocksDistanceToDirectionAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const distance = Number.parseInt(opts.messageElems[1], 10);
    const direction = opts.messageElems[2];

    bag.logStepHeading(
      `Move blocks distance to direction: ${distance} ${direction}...`,
    );
    const status = this.npc.moveBlocksDistanceToDirection(distance, direction);
    this.registerInfo(status);
  }
}

export { MoveBlocksDistanceToDirectionAction as default };
