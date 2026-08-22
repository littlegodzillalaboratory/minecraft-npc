"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayLightLevelAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();
    const block = bot.blockAt(bot.entity.position);
    const light = block && block.light !== undefined ? block.light : "unknown";

    bag.logStepHeading("Saying light level...");
    const status = await this.npc.sayMessage(
      `The light level here is ${light}`,
    );
    this.registerInfo(status);
  }
}

export { SayLightLevelAction as default };
