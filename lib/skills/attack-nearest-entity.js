"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class AttackNearestEntitySkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const entityName = opts.entityName.toLowerCase().replaceAll(" ", "_");
    const entity = this.bot.nearestEntity(
      (candidate) => candidate.name && candidate.name.includes(entityName),
    );

    if (!entity) {
      return this.fail(`I cannot find any ${opts.entityName} nearby`);
    }

    this.bot.pvp.attack(entity);
    bag.logStepItemSuccess(`Started attacking ${entity.name}`);
  }
}

export { AttackNearestEntitySkill as default };
