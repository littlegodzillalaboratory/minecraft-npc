"use strict"
import BaseSkill from './base.js';

class GuardLocationSkill extends BaseSkill {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const pos = this.npc.getPosition();
    const posX = pos.x;
    const posY = pos.y;
    const posZ = pos.z;

    bag.logStepHeading('Guarding current location...');
    const status = this.npc.guardLocation(posX, posY, posZ);
    this.registerInfo(status);
  }
}

export {
  GuardLocationSkill as default
};
