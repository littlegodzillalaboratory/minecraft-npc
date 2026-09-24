"use strict";
import BaseSkill from "./base.js";

class StopSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    // Persistent activities own listeners that must be disposed before motion
    // and combat are stopped, otherwise they could immediately resume.
    this.bot.guardController?.stop();
    if (this.bot.pathfinder && this.bot.pathfinder.stop) {
      this.bot.pathfinder.stop();
    }
    if (this.bot.pathfinder && this.bot.pathfinder.setGoal) {
      this.bot.pathfinder.setGoal(null);
    }
    if (this.bot.pvp && this.bot.pvp.stop) {
      this.bot.pvp.stop();
    }
    if (this.bot.clearControlStates) {
      this.bot.clearControlStates();
    }
  }
}

export { StopSkill as default };
