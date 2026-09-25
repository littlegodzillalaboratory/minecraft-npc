"use strict";
import bag from "bagofcli";
import BaseAction from "./base.js";

class EnableAutoModeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const engineName = opts.messageElems?.[1] || opts.engine;
    bag.logStepHeading(
      `Enabling auto mode${engineName ? ` as ${engineName}` : ""}...`,
    );
    const status = await this.npc.enableAutoMode(engineName);
    this.registerInfo(status);
  }
}

export { EnableAutoModeAction as default };
