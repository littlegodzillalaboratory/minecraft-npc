"use strict";
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
      this.bot.chat(`I cannot find any ${opts.entityName} nearby`);
      return;
    }

    this.bot.pvp.attack(entity);
  }
}

export { AttackNearestEntitySkill as default };
