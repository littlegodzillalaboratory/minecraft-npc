"use strict"
import _ from 'lodash';
import Action from './base-action.js';
import SayCurrentLocationAction from './say-current-location.js';
import bag from 'bagofcli';

const MESSAGE_MAPPING = [
  { action: 'SayCurrentLocationAction',
    regexes: [
      'what is your location\?',
      'send location'
    ]
  }
]

class RespondToMessageAction extends Action {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const message = opts.message;
    const sender = opts.sender;

    let status;

    bag.logStepHeading(`Responding to message...`);

    if (_.isString(message)) {

      let action;

      for (let messageConfig of MESSAGE_MAPPING) {
        for (let messageRegex of messageConfig.regexes) {
          if (message.match(new RegExp(messageRegex))) {
            bag.logStepItemSuccess(`Found matching action: ${messageConfig.action}, for message: ${message}, from sender: ${sender}`);
            action = eval(`new ${messageConfig.action}(this.register, this.bot)`);
          }
        }
      }

      if (action) {

        action.do({
          message: message,
          sender: sender
        });

      } else {
        bag.logStepItemWarning(`Unable find any matching action for message: ${message}, from sender: ${sender}`);
        status = 'failed';
      }
        
    } else {
      bag.logStepItemError(`Unable to respond to invalid message: ${message}, for message: ${message}, from sender: ${sender}`);
      status = 'failed';
    }

    this.register.setActionInfo(this.getId(), status, Date.now());
  }
}

export {
  RespondToMessageAction as default
};
