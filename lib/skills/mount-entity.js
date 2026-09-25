"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class MountEntitySkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const entityName = opts.entityName.toLowerCase().replaceAll(" ", "_");
    const entity = this.bot.nearestEntity(
      (candidate) => candidate.name && candidate.name.includes(entityName),
    );

    if (!entity) {
      return this.fail(`I cannot find any ${opts.entityName} to ride nearby`);
    }

    this.bot.mount(entity);
    bag.logStepItemSuccess(`Mounted the ${entity.name}`);
  }
}

export { MountEntitySkill as default };
