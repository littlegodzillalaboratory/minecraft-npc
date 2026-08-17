"use strict";
import BaseSkill from "./base.js";
import MoveToLocationSkill from "./move-to-location.js";

class WanderSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const dx = Math.floor(Math.random() * 33) - 16;
    const dz = Math.floor(Math.random() * 33) - 16;
    const position = this.bot.entity.position;

    new MoveToLocationSkill(this.bot).do({
      posX: Math.round(position.x) + dx,
      posY: Math.round(position.y),
      posZ: Math.round(position.z) + dz,
    });
  }
}

export { WanderSkill as default };
