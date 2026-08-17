"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MountEntityAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.messageElems[1].trim();

    bag.logStepHeading(`Mounting entity: ${entityName}...`);
    const status = await this.npc.mountEntity(entityName);
    this.registerInfo(status);
  }
}

export { MountEntityAction as default };
