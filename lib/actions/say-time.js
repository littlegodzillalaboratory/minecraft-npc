"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayTimeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();
    const timeOfDay = bot.time.timeOfDay;
    const period = timeOfDay >= 13000 && timeOfDay <= 23000 ? "night" : "day";

    bag.logStepHeading("Saying time...");
    const status = await this.npc.sayMessage(
      `The time of day is ${timeOfDay}, it is ${period} time`,
    );
    this.registerInfo(status);
  }
}

export { SayTimeAction as default };
