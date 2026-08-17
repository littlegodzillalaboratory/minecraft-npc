"use strict";
import BaseSkill from "./base.js";

const DIRECTION_YAWS = {
  south: 0,
  west: Math.PI / 2,
  north: Math.PI,
  east: -Math.PI / 2,
};

class FaceDirectionSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const yaw =
      opts.direction === "around"
        ? this.bot.entity.yaw + Math.PI
        : DIRECTION_YAWS[opts.direction];

    await this.bot.look(yaw, 0);
  }
}

export { FaceDirectionSkill as default };
