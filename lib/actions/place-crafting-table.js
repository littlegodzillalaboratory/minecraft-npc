"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class PlaceCraftingTableAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    bag.logStepHeading("Placing crafting table...");
    const status = await this.npc.placeBlock("crafting_table");
    this.registerInfo(status);
  }
}

export { PlaceCraftingTableAction as default };
