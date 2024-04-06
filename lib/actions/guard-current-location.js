"use strict"
import _ from 'lodash';
import BaseAction from './base.js';
import bag from 'bagofcli';

class GuardCurrentLocationAction extends BaseAction {

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
    this.npc.getRegister().setActionInfo(this.getId(), status);
  }
}

export {
  GuardCurrentLocationAction as default
};
