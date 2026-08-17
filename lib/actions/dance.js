"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class DanceAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Dancing...");
    const status = await this.npc.dance();
    this.registerInfo(status);
  }
}

export { DanceAction as default };
