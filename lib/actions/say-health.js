"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayHealthAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();

    bag.logStepHeading("Saying health...");
    const status = await this.npc.sayMessage(`My health is ${bot.health} out of 20`);
    this.registerInfo(status);
  }
}

export { SayHealthAction as default };
