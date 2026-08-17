"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ThankYouResponseAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading(`Responding to thanks from player: ${opts.player}...`);
    const status = await this.npc.sayMessage(`You are welcome, ${opts.player}!`);
    this.registerInfo(status);
  }
}

export { ThankYouResponseAction as default };
