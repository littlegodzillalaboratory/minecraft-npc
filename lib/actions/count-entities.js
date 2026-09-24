"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CountEntitiesAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.messageElems[1].trim();
    const count = this.npc.countEntities(entityName);

    bag.logStepHeading(`Counting entities: ${entityName}...`);
    const status = await this.npc.sayMessage(
      `I can see ${count} ${entityName} nearby`,
    );
    this.registerInfo(status);
  }
}

export { CountEntitiesAction as default };
