"use strict"
import bag from 'bagofcli';
import v from './validator.js'
import GuardLocationSkill from './skills/guard-location.js';
import MessageChatGptSkill from './skills/message-chatgpt.js';
import MoveToLocationSkill from './skills/move-to-location.js';
import SayMessageSkill from './skills/say-message.js';

class Npc {

  constructor(bot, register, opts) {
    this.bot = bot;
    this.register = register;
    this.opts = opts;
  }

  getBot() {
    return this.bot;
  }

  getRegister() {
    return this.register;
  }

  getOpts() {
    return this.opts;
  }

  getPosition() {
    return this.bot.entity.position;
  }

  getPlayerPosition(player) {
    return this.bot.players[player].entity.position;
  }

  guardLocation(posX, posY, posZ) {

    this.moveToLocation(posX, posY, posZ);
    return this._doSkill(
      new GuardLocationSkill(this.bot),
      { posX: posX, posY: posY, posZ: posZ },
      () => v.isValidCoord(posX, posY, posZ),
      `${this.bot.username} is guarding location: ${posX} ${posY} ${posZ}`,
      `Unable to guard invalid location: ${posX} ${posY} ${posZ}`
    );

  }

  messageChatGpt(player, message) {

    return this._doSkill(
      new MessageChatGptSkill(this.bot),
      { message: message },
      () => v.isValidMessage(player, message),
      `${this.bot.username} is sending ChatGPT message: ${message}`,
      `Unable to send invalid message: ${message}`
    );

  }

  moveToLocation(posX, posY, posZ) {

    return this._doSkill(
      new MoveToLocationSkill(this.bot),
      { posX: posX, posY: posY, posZ: posZ },
      () => v.isValidCoord(posX, posY, posZ),
      `${this.bot.username} is moving to location: ${posX} ${posY} ${posZ}`,
      `Unable to move ${this.bot.username} to invalid location: ${posX} ${posY} ${posZ}`
    );

  }

  sayMessage(message) {

    return this._doSkill(
      new SayMessageSkill(this.bot),
      { message: message },
      () => v.isValidMessage(message),
      `${this.bot.username} is saying message: ${message}`,
      `Unable to say invalid message: ${message}`
    );

  }

  _doSkill(skill, opts, validation, successMessage, failureMessage) {

    let status;

    if (validation()) {

      skill.do(opts);
      bag.logStepItemSuccess(successMessage);
      status = 'success';

    } else {

      bag.logStepItemError(failureMessage);
      status = 'failed';

    }

    return status;
  }
}

export {
  Npc as default
};