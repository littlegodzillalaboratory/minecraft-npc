"use strict"
import _ from 'lodash';
import Action from './base-action.js';
import bag from 'bagofcli';
import MoveToMessageSenderLocationAction from './move-to-player-location.js'; // eslint-disable-line no-unused-vars
import SayCurrentLocationAction from './say-current-location.js'; // eslint-disable-line no-unused-vars

const MESSAGE_MAPPING = [
  { action: 'SayCurrentLocationAction',
    regexes: [
      'what is your location\\?',
      'send location'
    ]
  },
  { action: 'GuardAreaAction',
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

class RespondToMessageAction extends Action {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const message = opts.message;
    const player = opts.player;

    let status;

    bag.logStepHeading(`Responding to message...`);

    if (_.isString(message)) {

      let action;

      for (let messageConfig of MESSAGE_MAPPING) {
        for (let messageRegex of messageConfig.regexes) {
          if (message.match(new RegExp(messageRegex))) {
            bag.logStepItemSuccess(`Found matching action: ${messageConfig.action}, for message: ${message}, from player: ${player}`);
            action = eval(`new ${messageConfig.action}(this.register, this.bot)`);
          }
        }
      }

      if (action) {

        action.do({
          message: message,
          player: player
        });

      } else {
        bag.logStepItemWarning(`Unable find any matching action for message: ${message}, from player: ${player}`);
        status = 'failed';
      }

    } else {
      bag.logStepItemError(`Unable to respond to invalid message: ${message}, for message: ${message}, from player: ${player}`);
      status = 'failed';
    }

    this.register.setActionInfo(this.getId(), status);
  }
}

export {
  RespondToMessageAction as default
};
