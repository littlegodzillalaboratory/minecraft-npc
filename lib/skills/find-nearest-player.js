"use strict";
import BaseSkill from "./base.js";

class FindNearestPlayerSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the nearest other player entity, if one is visible. */
  do(opts) {
    return this.bot.nearestEntity(
      (entity) =>
        entity.type === "player" && entity.username !== this.bot.username,
    );
  }
}

export { FindNearestPlayerSkill as default };
