"use strict"
import _ from 'lodash';
import Action from './action.js';
import bag from 'bagofcli';

class InitMessage extends Action {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const messages = opts.messages;

    let status;

    bag.logStepHeading('Displaying initial  message...');
    if (_.isArray(messages)) {
  
      const message = _.sample(messages);
      if (_.isString(message)) {
      
        this.bot.chat(message);
        bag.logStepItemSuccess(`Initial message has been displayed: ${message}`);
        status = 'success';
      
      } else {
        bag.logStepItemError(`Unable to display invalid message: ${message}`);
        status = 'failed';
      }
  
    } else {
      bag.logStepItemError(`Unable to display invalid messages: ${message}`);
      status = 'failed';
    }

    this.register.setActionInfo(this.getId(), status, Date.now());
  }
}

export {
  InitMessage as default
};
