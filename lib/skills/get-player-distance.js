"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class GetPlayerDistanceSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the distance to a visible player, or null when not visible. */
  do(opts) {
    const entity = this.bot.players[opts.player]?.entity;
    const distance = entity
      ? this.bot.entity.position.distanceTo(entity.position)
      : null;
    bag.logStepItemSuccess(
      distance === null
        ? `Could not locate ${opts.player}`
        : `Measured the distance to ${opts.player}`,
    );
    return distance;
  }
}

export { GetPlayerDistanceSkill as default };
