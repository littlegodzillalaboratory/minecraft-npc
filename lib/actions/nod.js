"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class NodAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Nodding...");
    const status = await this.npc.gesture("nod");
    this.registerInfo(status);
  }
}

export { NodAction as default };
