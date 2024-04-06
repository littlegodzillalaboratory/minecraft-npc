"use strict"
import BaseAction from './base.js';
import bag from 'bagofcli';
import GuardCurrentLocationAction from './guard-current-location.js'; // eslint-disable-line no-unused-vars
import MoveToPlayerLocationAction from './move-to-player-location.js'; // eslint-disable-line no-unused-vars
import SayCurrentLocationAction from './say-current-location.js'; // eslint-disable-line no-unused-vars

const MESSAGE_MAPPING = [
  { action: 'SayCurrentLocationAction',
    regexes: [
      'what is your location\\?',
      'send location'
    ]
  },
  { action: 'GuardCurrentLocationAction',
    regexes: [
      'guard the area',
      'defend the area',
      'stand your ground'
    ]
  },
  { action: 'MoveToPlayerLocationAction',
    regexes: [
      'come here',
      'get over here'
    ]
  }
]

class RespondToMessageAction extends BaseAction {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const message = opts.message;
    const sender = opts.sender;

    let status;

    bag.logStepHeading(`Responding to message...`);

    let action;

    for (let messageConfig of MESSAGE_MAPPING) {
      for (let messageRegex of messageConfig.regexes) {
        if (message.match(new RegExp(messageRegex))) {
          bag.logStepItemSuccess(`Found matching action: ${messageConfig.action}, for message: ${message}, from sender: ${sender}`);
          action = eval(`new ${messageConfig.action}(this.npc)`);
        }
      }
    }

    if (action) {
      action.do({
        message: message,
        player: sender
      });

    } else {
      bag.logStepItemWarning(`Unable find any matching action for message: ${message}, from sender: ${sender}`);
      status = 'failed';
    }

    this.registerInfo(status);
  }
}

export {
  RespondToMessageAction as default
};
