"use strict";
import bag from "bagofcli";

class BaseSkill {
  constructor(bot) {
    this.bot = bot;
  }

  getId() {
    bag.logStepItemError("Skill should implement getId method!");
  }

  do(opts) {
    bag.logStepItemError("Skill should implement do method!");
  }

  /**
   * Describe a player-facing failure. NPC-managed skills throw so the action
   * can relay the outcome; standalone skills retain their legacy chat API.
   */
  fail(message) {
    if (this.bot.deferSkillMessages) throw new Error(message);
    this.bot.chat(message);
  }

  /**
   * Describe non-error information produced by a skill. NPC-managed skills
   * return it to the action, while standalone skills retain legacy chat.
   */
  inform(message) {
    if (this.bot.deferSkillMessages) return { message: message };
    this.bot.chat(message);
  }
}

export { BaseSkill as default };
