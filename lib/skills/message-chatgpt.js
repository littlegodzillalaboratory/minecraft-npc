"use strict";
import BaseSkill from "./base.js";

class MessageChatGptSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const reply = await this.bot.chatgpt.sendMessage(opts.player, opts.message);
    this.bot.chat(reply);
  }
}

export { MessageChatGptSkill as default };
