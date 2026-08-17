"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class JumpAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Jumping...");
    const status = await this.npc.jump();
    this.registerInfo(status);
  }
}

export { JumpAction as default };
