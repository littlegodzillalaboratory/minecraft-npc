"use strict"
import _ from 'lodash';
import bag from 'bagofcli';

function exec(bot, message) {
  bag.logStepHeading('Displaying initial  message...');
  if (_.isString(message)) {
    bot.chat(message);
    bag.logStepItemSuccess(`Initial message has been displayed: ${message}`)
  } else {
    bag.logStepItemError(`Unable to display invalid message: ${message}`);
  }
}

export {
  exec as default
};
