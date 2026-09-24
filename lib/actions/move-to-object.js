"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MoveToObjectAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const objectName = opts.messageElems[1].trim();

    bag.logStepHeading(`Moving to object ${objectName}...`);
    const destination = await this.npc.moveToObject(objectName);
    const outcome = await this.moveToOutcome(destination);
    this.registerInfo(outcome);
  }
}

export { MoveToObjectAction as default };
