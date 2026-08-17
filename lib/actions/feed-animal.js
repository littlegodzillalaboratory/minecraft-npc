"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FeedAnimalAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.messageElems[1].trim();

    bag.logStepHeading(`Feeding animal: ${entityName}...`);
    const status = await this.npc.feedAnimal(entityName);
    this.registerInfo(status);
  }
}

export { FeedAnimalAction as default };
