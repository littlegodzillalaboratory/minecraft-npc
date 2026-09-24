"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class ListPlayersAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const players = this.npc.listVisiblePlayers();

    bag.logStepHeading("Listing players...");
    const message = players.length
      ? `Players online: ${players.join(", ")}`
      : "I do not see any other players online";
    const status = await this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export { ListPlayersAction as default };
