"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class WhisperSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    this.bot.whisper(opts.player, opts.message);
    bag.logStepItemSuccess(`Whispered to ${opts.player}`);
  }
}

export { WhisperSkill as default };
