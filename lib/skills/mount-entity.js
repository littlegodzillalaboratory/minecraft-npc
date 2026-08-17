"use strict";
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
      this.bot.chat(`I cannot find any ${opts.entityName} to ride nearby`);
      return;
    }

    this.bot.mount(entity);
  }
}

export { MountEntitySkill as default };
