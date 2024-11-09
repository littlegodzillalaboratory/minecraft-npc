"use strict";
import BaseSkill from './base.js';

class MessageChatGptSkill extends BaseSkill {

  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.chatgpt.sendMessage(opts.username, opts.message);
  }
}

export {
  MessageChatGptSkill as default
};
