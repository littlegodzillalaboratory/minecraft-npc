"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CountEntitiesAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const entityName = opts.messageElems[1].trim();
    const query = entityName
      .toLowerCase()
      .replaceAll(" ", "_")
      .replace(/s$/, "");
    const bot = this.npc.getBot();
    const count = Object.values(bot.entities).filter((entity) => {
      if (!entity.name || !entity.name.includes(query)) return false;
      return entity.position.distanceTo(bot.entity.position) <= 32;
    }).length;

    bag.logStepHeading(`Counting entities: ${entityName}...`);
    const status = await this.npc.sayMessage(
      `I can see ${count} ${entityName} nearby`,
    );
    this.registerInfo(status);
  }
}

export { CountEntitiesAction as default };
