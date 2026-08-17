"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

const FACTS = [
  "Creepers were created by a coding mistake while making pigs.",
  "The Far Lands used to appear about 12.5 million blocks from spawn.",
  "Endermen cannot be hit by projectiles, they always teleport away.",
  "A Minecraft day lasts exactly 20 minutes in real time.",
  "Ghast sounds were made by a sleeping cat being woken up.",
];

class TellFactAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const fact = FACTS[Math.floor(Math.random() * FACTS.length)];

    bag.logStepHeading("Telling fact...");
    const status = await this.npc.sayMessage(fact);
    this.registerInfo(status);
  }
}

export { TellFactAction as default };
