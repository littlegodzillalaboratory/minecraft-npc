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

  /** Return the straight-line distance between two Minecraft positions. */
  getDistance(position, origin = this.bot.entity.position) {
    if (typeof position.distanceTo === "function") {
      return position.distanceTo(origin);
    }
    const dx = position.x - origin.x;
    const dy = position.y - origin.y;
    const dz = position.z - origin.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Return whether an entity is a live, visible hostile within the requested
   * distance. Mineflayer may omit health and validity while an entity is live,
   * so only explicit invalid or dead values exclude it.
   */
  isVisibleThreat(entity, maximumDistance = Infinity, origin) {
    if (!entity?.position || entity.isValid === false || entity.health === 0) {
      return false;
    }
    const definition = this.bot.registry.entitiesByName[entity.name];
    if (definition?.category !== "Hostile mobs") return false;
    if (this.getDistance(entity.position, origin) > maximumDistance) {
      return false;
    }
    return (
      typeof this.bot.canSeeEntity !== "function" ||
      this.bot.canSeeEntity(entity)
    );
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
