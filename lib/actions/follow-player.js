"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class FollowPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading(`Following player: ${opts.player}...`);
    const status = await this.npc.followPlayer(opts.player);
    this.registerInfo(status);
  }
}

export { FollowPlayerAction as default };
