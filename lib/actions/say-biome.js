"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayBiomeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();
    const block = bot.blockAt(bot.entity.position);
    const biomeName =
      block && block.biome && block.biome.name ? block.biome.name : "unknown";

    bag.logStepHeading("Saying biome...");
    const status = await this.npc.sayMessage(`I am in the ${biomeName} biome`);
    this.registerInfo(status);
  }
}

export { SayBiomeAction as default };
