"use strict"
import _ from 'lodash';
import Action from './base-action.js';
import bag from 'bagofcli';

class SayInitMessageAction extends Action {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const messages = opts.messages;

    bag.logStepHeading('Saying initial  message...');
    const message = _.sample(messages);
    const status = this.npc.sayMessage(message);
    this.npc.getRegister().setActionInfo(this.getId(), status);
  }
}

export {
  SayInitMessageAction as default
};
