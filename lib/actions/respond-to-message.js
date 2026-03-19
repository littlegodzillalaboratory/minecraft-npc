"use strict";
import BaseAction from './base.js';
import bag from 'bagofcli';
import EmptyInventoryAction from './empty-inventory.js';
import GuardCurrentLocationAction from './guard-current-location.js';
import MoveToPlayerLocationAction from './move-to-player-location.js';
import SayCurrentLocationAction from './say-current-location.js';
import ForwardToChatGptAction from './forward-to-chatgpt.js';

const MESSAGE_MAPPING = [
  { action: 'EmptyInventoryAction',
    regexes: [
      'empty inventory',
      'drop all items',
      'clear inventory'
    ]
  },
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
];

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

    for (const messageConfig of MESSAGE_MAPPING) {
      for (const messageRegex of messageConfig.regexes) {
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
      status = 'success';

    } else {
      bag.logStepItemSuccess(`Forwarding to ChatGPT message: ${message}, from sender: ${sender}`);
      new ForwardToChatGptAction(this.npc).do({
        message: message,
        player: sender
      });
      status = 'success';
    }

    this.registerInfo(status);
  }
}

export {
  RespondToMessageAction as default
};
