"use strict"
import BaseAction from './base.js';
import bag from 'bagofcli';

class GuardCurrentLocationAction extends BaseAction {

  getId() {
    return this.constructor.name;
  }

  do(opts) { // eslint-disable-line no-unused-vars

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
  GuardCurrentLocationAction as default
};
