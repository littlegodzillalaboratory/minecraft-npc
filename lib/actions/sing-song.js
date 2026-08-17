"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

const SONG_LINES = [
  "I stayed up all night mining for you...",
  "Diamonds in the deep, torches on the wall...",
  "Creeper, aw man, so we back in the mine...",
];

class SingSongAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Singing song...");
    let status;
    for (const line of SONG_LINES) {
      status = await this.npc.sayMessage(line);
    }
    this.registerInfo(status);
  }
}

export { SingSongAction as default };
