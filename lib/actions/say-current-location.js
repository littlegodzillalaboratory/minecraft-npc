"use strict"
import _ from 'lodash';
import Action from './base-action.js';
import bag from 'bagofcli';

class SayCurrentLocationAction extends Action {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const messages = opts.message;

    let status;

    bag.logStepHeading('Saying current location...');

    const coordX = this.bot.entity.position.x;
    const coordY = this.bot.entity.position.y;
    const coordZ = this.bot.entity.position.z;

    const message = `I am at ${coordX} ${coordY} ${coordZ}`;
    this.bot.chat(message);
    bag.logStepItemSuccess(`Current location has been said: ${message}`);
    status = 'success';
    
    this.register.setActionInfo(this.getId(), status, Date.now());
  }
}

export {
  SayCurrentLocationAction as default
};
