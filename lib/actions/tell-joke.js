"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

const JOKES = [
  "Why did the creeper cross the road? To get to the other ssssside!",
  "What did the zombie say to the villager? Nice to eat you!",
  "Why do endermen make bad comedians? They cannot handle eye contact.",
  "I would tell you a joke about diamonds, but I am still digging for it.",
  "Why did the skeleton skip the party? He had no body to go with.",
];

class TellJokeAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const joke = JOKES[Math.floor(Math.random() * JOKES.length)];

    bag.logStepHeading("Telling joke...");
    const status = await this.npc.sayMessage(joke);
    this.registerInfo(status);
  }
}

export { TellJokeAction as default };
