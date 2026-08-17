"use strict";
import BaseSkill from "./base.js";

class GestureSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const yaw = this.bot.entity.yaw;

    if (opts.gestureName === "nod") {
      await this.bot.look(yaw, 0.6);
      await this.bot.look(yaw, -0.4);
      await this.bot.look(yaw, 0);
    } else if (opts.gestureName === "shake") {
      await this.bot.look(yaw + 0.6, 0);
      await this.bot.look(yaw - 0.6, 0);
      await this.bot.look(yaw, 0);
    }
  }
}

export { GestureSkill as default };
