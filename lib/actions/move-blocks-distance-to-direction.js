"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MoveBlocksDistanceToDirectionAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const distance = Number.parseInt(opts.messageElems[1], 10);
    const direction = opts.messageElems[2];

    bag.logStepHeading(
      `Moving ${distance} blocks to ${direction} direction...`,
    );
    const status = await this.npc.moveBlocksDistanceToDirection(
      distance,
      direction,
    );
    this.registerInfo(status);
  }
}

export { MoveBlocksDistanceToDirectionAction as default };
