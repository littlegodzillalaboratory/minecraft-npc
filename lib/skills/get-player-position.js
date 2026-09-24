"use strict";
import BaseSkill from "./base.js";

class GetPlayerPositionSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return a visible player's position, or null when not visible. */
  do(opts) {
    return this.bot.players[opts.player]?.entity?.position || null;
  }
}

export { GetPlayerPositionSkill as default };
