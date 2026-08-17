"use strict";
import BaseSkill from "./base.js";

class MessageChatGptSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const reply = await this.bot.chatgpt.sendMessage(
      opts.username,
      opts.message,
    );
    console.log("The reply the skill got from ChatGPT is: " + reply);
    // console.dir(this.bot);
    // console.log("u23The reply the skill got from ChatGPT is: " + reply);
    // console.dir(this.bot.chat);
    console.dir(reply);
    console.log(typeof reply);
    this.bot.chat(reply);
  }
}

export { MessageChatGptSkill as default };
