"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class ListVisiblePlayersSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return visible player names, excluding the NPC itself. */
  do(opts) {
    const players = Object.keys(this.bot.players).filter(
      (player) => player !== this.bot.username,
    );
    bag.logStepItemSuccess(`Visible players found: ${players.length}`);
    return players;
  }
}

export { ListVisiblePlayersSkill as default };
