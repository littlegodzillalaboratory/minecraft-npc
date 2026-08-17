"use strict";
import BaseSkill from "./base.js";

class WhisperSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.whisper(opts.player, opts.message);
  }
}

export { WhisperSkill as default };
