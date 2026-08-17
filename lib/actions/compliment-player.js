"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

const COMPLIMENTS = [
  "your builds are absolutely legendary!",
  "you are braver than a warden fighter!",
  "you always know where the diamonds are!",
  "you are the best miner I know!",
];

class ComplimentPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const compliment =
      COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];

    bag.logStepHeading(`Complimenting player: ${opts.player}...`);
    const status = await this.npc.sayMessage(`${opts.player}, ${compliment}`);
    this.registerInfo(status);
  }
}

export { ComplimentPlayerAction as default };
