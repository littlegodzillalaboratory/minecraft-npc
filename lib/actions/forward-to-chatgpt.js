"use strict";
import BaseAction from './base.js';
import bag from 'bagofcli';

class ForwardToChatGptAction extends BaseAction {

  getId() {
    return this.constructor.name;
  }

  do(opts) { // eslint-disable-line no-unused-vars

    const player = opts.player;
    const message = opts.message;

    bag.logStepHeading('Forwarding message to ChatGPT...');
    const status = this.npc.messageChatGpt(player, message);
    this.registerInfo(status);
  }
}

export {
  ForwardToChatGptAction as default
};
