"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayElevationAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const pos = this.npc.getPosition();

    bag.logStepHeading("Saying elevation...");
    const status = await this.npc.sayMessage(
      `I am at elevation ${Math.round(pos.y)}`,
    );
    this.registerInfo(status);
  }
}

export { SayElevationAction as default };
