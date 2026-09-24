"use strict";
import BaseSkill from "./base.js";

class GetPlayerDistanceSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the distance to a visible player, or null when not visible. */
  do(opts) {
    const entity = this.bot.players[opts.player]?.entity;
    return entity ? this.bot.entity.position.distanceTo(entity.position) : null;
  }
}

export { GetPlayerDistanceSkill as default };
