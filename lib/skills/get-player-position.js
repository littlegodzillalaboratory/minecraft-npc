"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class GetPlayerPositionSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return a visible player's position, or null when not visible. */
  do(opts) {
    const position = this.bot.players[opts.player]?.entity?.position || null;
    bag.logStepItemSuccess(
      position
        ? `Found ${opts.player}'s position`
        : `Could not locate ${opts.player}`,
    );
    return position;
  }
}

export { GetPlayerPositionSkill as default };
