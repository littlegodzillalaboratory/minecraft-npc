"use strict"
import _ from 'lodash';
import bag from 'bagofcli';

function exec(bot, messages) {
  bag.logStepHeading('Displaying initial  message...');
  if (_.isArray(messages)) {

    const message = _.sample(messages);
    if (_.isString(message)) {
    
      bot.chat(message);
      bag.logStepItemSuccess(`Initial message has been displayed: ${message}`)
    
    } else {
      bag.logStepItemError(`Unable to display invalid message: ${message}`);
    }

  } else {
    bag.logStepItemError(`Unable to display invalid messages: ${message}`);
  }
}

export {
  exec as default
};
