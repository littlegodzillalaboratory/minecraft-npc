"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class DefendMeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading(`Defending player: ${opts.player}...`);
    const status = await this.npc.defendPlayer(opts.player);
    this.registerInfo(status);
  }
}

export { DefendMeAction as default };
