"use strict";
import BaseAction from './base.js';
import bag from 'bagofcli';

class SayCurrentLocationAction extends BaseAction {

  getId() {
    return this.constructor.name;
  }

  do(opts) { // eslint-disable-line no-unused-vars

    const pos = this.npc.getPosition();
    const posX = pos.x;
    const posY = pos.y;
    const posZ = pos.z;

    bag.logStepHeading('Saying current location...');
    const message = `I am at ${posX} ${posY} ${posZ}`;
    const status = this.npc.sayMessage(message);
    this.registerInfo(status);
  }
}

export {
  SayCurrentLocationAction as default
};
