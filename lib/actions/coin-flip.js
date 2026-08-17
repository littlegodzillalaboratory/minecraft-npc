"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CoinFlipAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const side = Math.random() < 0.5 ? "heads" : "tails";

    bag.logStepHeading("Flipping coin...");
    const status = await this.npc.sayMessage(`The coin landed on ${side}`);
    this.registerInfo(status);
  }
}

export { CoinFlipAction as default };
