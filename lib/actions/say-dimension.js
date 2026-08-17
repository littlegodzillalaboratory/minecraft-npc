"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayDimensionAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();

    bag.logStepHeading("Saying dimension...");
    const status = await this.npc.sayMessage(
      `I am in the ${bot.game.dimension} dimension`,
    );
    this.registerInfo(status);
  }
}

export { SayDimensionAction as default };
