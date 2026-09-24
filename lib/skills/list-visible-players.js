"use strict";
import BaseSkill from "./base.js";

class ListVisiblePlayersSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return visible player names, excluding the NPC itself. */
  do(opts) {
    return Object.keys(this.bot.players).filter(
      (player) => player !== this.bot.username,
    );
  }
}

export { ListVisiblePlayersSkill as default };
