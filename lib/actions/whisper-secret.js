"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

const SECRETS = [
  "I once fell in lava with a full inventory of diamonds.",
  "I am secretly afraid of chickens.",
  "Sometimes I dig straight down when nobody is watching.",
  "I have never actually beaten the Ender Dragon.",
];

class WhisperSecretAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const secret = SECRETS[Math.floor(Math.random() * SECRETS.length)];

    bag.logStepHeading(`Whispering secret to player: ${opts.player}...`);
    const status = await this.npc.whisper(opts.player, secret);
    this.registerInfo(status);
  }
}

export { WhisperSecretAction as default };
