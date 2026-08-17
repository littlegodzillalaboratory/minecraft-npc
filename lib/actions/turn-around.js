"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class TurnAroundAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Turning around...");
    const status = await this.npc.faceDirection("around");
    this.registerInfo(status);
  }
}

export { TurnAroundAction as default };
