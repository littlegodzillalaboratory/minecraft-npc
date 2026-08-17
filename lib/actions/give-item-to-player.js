"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class GiveItemToPlayerAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();

    bag.logStepHeading(`Giving item: ${itemName} to player: ${opts.player}...`);
    const status = await this.npc.giveItem(opts.player, itemName);
    this.registerInfo(status);
  }
}

export { GiveItemToPlayerAction as default };
