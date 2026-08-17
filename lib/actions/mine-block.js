"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class MineBlockAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const blockName = opts.messageElems[1].trim();

    bag.logStepHeading(`Mining block: ${blockName}...`);
    const status = await this.npc.collectBlock(blockName);
    this.registerInfo(status);
  }
}

export { MineBlockAction as default };
