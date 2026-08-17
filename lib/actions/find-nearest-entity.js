"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FindNearestEntityAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.messageElems[1].trim();
    const query = entityName.toLowerCase().replaceAll(" ", "_");
    const bot = this.npc.getBot();
    const entity = bot.nearestEntity(
      (candidate) => candidate.name && candidate.name.includes(query),
    );

    bag.logStepHeading(`Finding nearest entity: ${entityName}...`);
    const message = entity
      ? `The nearest ${entityName} is at ${Math.round(entity.position.x)} ${Math.round(entity.position.y)} ${Math.round(entity.position.z)}`
      : `I cannot see any ${entityName} nearby`;
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { FindNearestEntityAction as default };
