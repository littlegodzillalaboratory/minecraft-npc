"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class GreetAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading(`Greeting player: ${opts.player}...`);
    const status = await this.npc.sayMessage(
      `Hello ${opts.player}! Nice to see you.`,
    );
    this.registerInfo(status);
  }
}

export { GreetAction as default };
