"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ReportThreatsAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();
    const threatNames = Object.values(bot.entities)
      .filter((entity) => {
        if (entity.type !== "mob") return false;
        const def = bot.registry.entitiesByName[entity.name];
        if (!def || def.category !== "Hostile mobs") return false;
        return entity.position.distanceTo(bot.entity.position) <= 30;
      })
      .map((entity) => entity.name);

    bag.logStepHeading("Reporting threats...");
    const message = threatNames.length
      ? `Threats nearby: ${threatNames.join(", ")}`
      : "There are no threats nearby";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { ReportThreatsAction as default };
