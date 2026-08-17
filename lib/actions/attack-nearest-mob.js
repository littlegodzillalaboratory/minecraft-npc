"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class AttackNearestMobAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.messageElems[1].trim();

    bag.logStepHeading(`Attacking nearest: ${entityName}...`);
    const status = await this.npc.attackNearestEntity(entityName);
    this.registerInfo(status);
  }
}

export { AttackNearestMobAction as default };
