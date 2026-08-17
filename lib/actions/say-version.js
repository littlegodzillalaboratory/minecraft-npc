"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayVersionAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();

    bag.logStepHeading("Saying version...");
    const status = await this.npc.sayMessage(
      `I am running Minecraft version ${bot.version}`,
    );
    this.registerInfo(status);
  }
}

export { SayVersionAction as default };
