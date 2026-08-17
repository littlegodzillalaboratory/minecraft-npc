"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayHeldItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();

    bag.logStepHeading("Saying held item...");
    const message = bot.heldItem
      ? `I am holding ${bot.heldItem.name}`
      : "I am not holding anything";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayHeldItemAction as default };
