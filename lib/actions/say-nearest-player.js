"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class SayNearestPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const bot = this.npc.getBot();
    const entity = bot.nearestEntity(
      (candidate) =>
        candidate.type === "player" && candidate.username !== bot.username,
    );

    bag.logStepHeading("Saying nearest player...");
    const message = entity
      ? `The nearest player to me is ${entity.username}`
      : "I do not see any players nearby";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { SayNearestPlayerAction as default };
