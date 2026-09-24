"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class HuntFoodAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const config = this.npc.getOpts();
    const allowedAnimals = opts.allowedAnimals ||
      config.autoModeAllowedHuntAnimals || [
        "cow",
        "pig",
        "chicken",
        "sheep",
        "rabbit",
      ];
    const maximumDistance =
      opts.maximumDistance || config.autoModeMaximumHuntingDistance || 64;
    bag.logStepHeading("Hunting for food...");
    const status = await this.npc.huntFood(allowedAnimals, maximumDistance);
    this.registerInfo(status);
  }
}

export { HuntFoodAction as default };
