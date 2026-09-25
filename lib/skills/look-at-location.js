"use strict";
import bag from "bagofcli";
import vec3 from "vec3";
import BaseSkill from "./base.js";

class LookAtLocationSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    await this.bot.lookAt(new vec3.Vec3(opts.posX, opts.posY, opts.posZ));
    bag.logStepItemSuccess(
      `Now looking at ${opts.posX}, ${opts.posY}, ${opts.posZ}`,
    );
  }
}

export { LookAtLocationSkill as default };
