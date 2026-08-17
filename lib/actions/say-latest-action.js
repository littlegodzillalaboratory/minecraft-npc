"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayLatestActionAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const latestAction = this.npc.getRegister().getLatestAction();

    bag.logStepHeading("Saying latest action...");
    const message = latestAction
      ? `My latest action is ${latestAction.id}`
      : "I have not done anything yet";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayLatestActionAction as default };
