"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class PlaceBlockAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();

    bag.logStepHeading(`Placing block: ${itemName}...`);
    const status = await this.npc.placeBlock(itemName);
    this.registerInfo(status);
  }
}

export { PlaceBlockAction as default };
