"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MoveToObjectAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const objectName = opts.messageElems[1].trim();

    bag.logStepHeading(`Moving to object ${objectName}...`);
    const status = this.npc.moveToObject(objectName);
    this.registerInfo(status);
  }
}

export { MoveToObjectAction as default };
