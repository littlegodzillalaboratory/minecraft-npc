"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class RollDiceAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const sides = Number.parseInt(opts.messageElems[1], 10) || 6;
    const roll = Math.floor(Math.random() * sides) + 1;

    bag.logStepHeading(`Rolling dice with ${sides} sides...`);
    const status = await this.npc.sayMessage(`I rolled a ${roll} out of ${sides}`);
    this.registerInfo(status);
  }
}

export { RollDiceAction as default };
