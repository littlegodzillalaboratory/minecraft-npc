"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ForwardToChatGptAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const player = opts.player;
    const message = opts.message;

    bag.logStepHeading("Forwarding message to ChatGPT...");
    const status = await this.npc.messageChatGpt(player, message);
    this.registerInfo(status);
  }
}

export { ForwardToChatGptAction as default };
