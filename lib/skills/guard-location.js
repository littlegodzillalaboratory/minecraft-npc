"use strict";
import BaseSkill from './base.js';

class GuardLocationSkill extends BaseSkill {

  getId() {
    return this.constructor.name;
  }

  do(opts) { // eslint-disable-line no-unused-vars

    const pos = this.npc.getPosition();
    const posX = pos.x;
    const posY = pos.y;
    const posZ = pos.z;

    const status = this.npc.guardLocation(posX, posY, posZ);
    this.registerInfo(status);
  }
}

export {
  GuardLocationSkill as default
};
