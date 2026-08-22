"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayExperienceAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();

    bag.logStepHeading("Saying experience...");
    const status = await this.npc.sayMessage(
      `I am level ${bot.experience.level}`,
    );
    this.registerInfo(status);
  }
}

export { SayExperienceAction as default };
