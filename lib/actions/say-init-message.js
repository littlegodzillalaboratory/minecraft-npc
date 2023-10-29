"use strict"
import _ from 'lodash';
import Action from './base-action.js';
import bag from 'bagofcli';

class SayInitMessage extends Action {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const messages = opts.messages;

    let status;

    bag.logStepHeading('Saying initial  message...');
    if (_.isArray(messages)) {
  
      const message = _.sample(messages);
      if (_.isString(message)) {
      
        this.bot.chat(message);
        bag.logStepItemSuccess(`Initial message has been said: ${message}`);
        status = 'success';
      
      } else {
        bag.logStepItemError(`Unable to say invalid message: ${message}`);
        status = 'failed';
      }
  
    } else {
      bag.logStepItemError(`Unable to say invalid messages: ${message}`);
      status = 'failed';
    }

    this.register.setActionInfo(this.getId(), status, Date.now());
  }
}

export {
  SayInitMessage as default
};
