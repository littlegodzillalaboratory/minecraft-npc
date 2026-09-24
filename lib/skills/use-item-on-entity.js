"use strict";
import BaseSkill from "./base.js";

class UseItemOnEntitySkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.entityName.toLowerCase().replaceAll(" ", "_");
    const entity = this.bot.nearestEntity(
      (candidate) => candidate.name && candidate.name.includes(entityName),
    );

    if (!entity) {
      return this.fail(`I cannot find any ${opts.entityName} nearby`);
    }

    const itemName = opts.itemName.toLowerCase().replaceAll(" ", "_");
    const item = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.includes(itemName));

    if (!item) {
      return this.fail(`I do not have any ${opts.itemName}`);
    }

    await this.bot.equip(item, "hand");
    await this.bot.useOn(entity);
  }
}

export { UseItemOnEntitySkill as default };
