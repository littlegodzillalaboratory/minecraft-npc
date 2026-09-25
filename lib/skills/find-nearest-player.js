"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class FindNearestPlayerSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the nearest other player entity, if one is visible. */
  do(opts) {
    const player = this.bot.nearestEntity(
      (entity) =>
        entity.type === "player" && entity.username !== this.bot.username,
    );
    bag.logStepItemSuccess(
      player ? `Found ${player.username}` : "Found no visible players",
    );
    return player;
  }
}

export { FindNearestPlayerSkill as default };
