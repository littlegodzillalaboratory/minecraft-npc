"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayFoodLevelAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();

    bag.logStepHeading("Saying food level...");
    const status = await this.npc.sayMessage(
      `My food level is ${bot.food} out of 20`,
    );
    this.registerInfo(status);
  }
}

export { SayFoodLevelAction as default };
