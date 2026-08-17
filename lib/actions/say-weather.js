"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayWeatherAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();
    let weather = "clear";
    if (bot.thunderState > 0) {
      weather = "a thunderstorm";
    } else if (bot.isRaining) {
      weather = "raining";
    }

    bag.logStepHeading("Saying weather...");
    const status = await this.npc.sayMessage(`The weather is ${weather}`);
    this.registerInfo(status);
  }
}

export { SayWeatherAction as default };
