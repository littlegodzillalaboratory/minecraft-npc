"use strict"
import Action from './base-action.js';
import bag from 'bagofcli';

class MoveToInitLocationAction extends Action {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const posX = opts.posX;
    const posY = opts.posY;
    const posZ = opts.posZ;

    bag.logStepHeading('Moving to initial location...');
    const status = this.npc.moveToLocation(posX, posY, posZ);
    this.npc.getRegister().setActionInfo(this.getId(), status);
  }
}

export {
  MoveToInitLocationAction as default
};
