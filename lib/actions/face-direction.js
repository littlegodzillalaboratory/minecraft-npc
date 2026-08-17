"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FaceDirectionAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const direction = opts.messageElems[1];

    bag.logStepHeading(`Facing direction: ${direction}...`);
    const status = await this.npc.faceDirection(direction);
    this.registerInfo(status);
  }
}

export { FaceDirectionAction as default };
