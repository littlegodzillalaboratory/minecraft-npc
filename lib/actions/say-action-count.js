"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayActionCountAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const latestAction = this.npc.getRegister().getLatestAction();
    const count = latestAction ? latestAction.counter : 0;

    bag.logStepHeading("Saying action count...");
    const status = await this.npc.sayMessage(
      `I have performed ${count} actions so far`,
    );
    this.registerInfo(status);
  }
}

export { SayActionCountAction as default };
