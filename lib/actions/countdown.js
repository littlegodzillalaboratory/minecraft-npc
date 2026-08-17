"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CountdownAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const from = Math.min(Number.parseInt(opts.messageElems[1], 10) || 5, 10);

    bag.logStepHeading(`Counting down from ${from}...`);
    for (let i = from; i >= 1; i--) {
      await this.npc.sayMessage(`${i}...`);
    }
    const status = await this.npc.sayMessage("Go!");
    this.registerInfo(status);
  }
}

export { CountdownAction as default };
