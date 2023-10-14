"use strict"
import _ from 'lodash';
import bag from 'bagofcli';

function exec(bot, message) {
  bag.logStepHeading('Displaying init message...');
  if (_.isString(message)) {
    bot.chat(message);
    bag.logStepItemSuccess(`Init message has been displayed: ${message}`)
  } else {
    bag.logStepItemError(`Unable to display non-string message: ${message}`);
  }
}

export {
  exec as default
};
