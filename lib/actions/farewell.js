"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FarewellAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading(`Saying farewell to player: ${opts.player}...`);
    const status = await this.npc.sayMessage(
      `Goodbye ${opts.player}! See you around.`,
    );
    this.registerInfo(status);
  }
}

export { FarewellAction as default };
