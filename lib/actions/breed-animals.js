"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class BreedAnimalsAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.messageElems[1].trim().replace(/s$/, "");

    bag.logStepHeading(`Breeding animals: ${entityName}...`);
    const status = await this.npc.breedAnimals(entityName);
    this.registerInfo(status);
  }
}

export { BreedAnimalsAction as default };
