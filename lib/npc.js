"use strict";
import bag from "bagofcli";
import v from "./validator.js";
import EmptyInventorySkill from "./skills/empty-inventory.js";
import GuardLocationSkill from "./skills/guard-location.js";
import MessageChatGptSkill from "./skills/message-chatgpt.js";
import MoveToLocationSkill from "./skills/move-to-location.js";
import MoveBlocksDistanceToDirectionSkill from "./skills/move-blocks-distance-to-direction.js";
import SayMessageSkill from "./skills/say-message.js";
import StopSkill from "./skills/stop.js";

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

  emptyInventory() {
    return this._doSkill(
      new EmptyInventorySkill(this.bot),
      {},
      () => true, // Always valid to empty inventory
      `${this.bot.username} is emptying inventory`,
      `Unable to empty inventory`,
    );
  }

  guardLocation(posX, posY, posZ) {
    this.moveToLocation(posX, posY, posZ);
    return this._doSkill(
      new GuardLocationSkill(this.bot),
      { posX: posX, posY: posY, posZ: posZ },
      () => v.isValidCoord(posX, posY, posZ),
      `${this.bot.username} is guarding location: ${posX} ${posY} ${posZ}`,
      `Unable to guard invalid location: ${posX} ${posY} ${posZ}`,
    );
  }

  messageChatGpt(player, message) {
    return this._doSkill(
      new MessageChatGptSkill(this.bot),
      { message: message },
      () => v.isValidMessage(player, message),
      `${this.bot.username} is sending ChatGPT message: ${message}`,
      `Unable to send invalid message: ${message}`,
    );
  }

  moveToLocation(posX, posY, posZ) {
    return this._doSkill(
      new MoveToLocationSkill(this.bot),
      { posX: posX, posY: posY, posZ: posZ },
      () => v.isValidCoord(posX, posY, posZ),
      `${this.bot.username} is moving to location: ${posX} ${posY} ${posZ}`,
      `Unable to move ${this.bot.username} to invalid location: ${posX} ${posY} ${posZ}`,
    );
  }

  moveBlocksDistanceToDirection(distance, direction) {
    return this._doSkill(
      new MoveBlocksDistanceToDirectionSkill(this.bot),
      { distance: distance, direction: direction },
      () => v.isValidMoveDirection(distance, direction),
      `${this.bot.username} is moving ${distance} blocks ${direction}`,
      `Unable to move ${this.bot.username} ${distance} blocks ${direction}`,
    );
  }

  sayMessage(message) {
    const skill = new SayMessageSkill(this.bot);
    const opts = { message: message };
    const validation = () => v.isValidMessage(message);
    const successMessage = `${this.bot.username} is saying message: ${message}`;
    const failureMessage = `Unable to say invalid message: ${message}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  stop() {
    return this._doSkill(
      new StopSkill(this.bot),
      {},
      () => true, // Always valid to stop current bot activity
      `${this.bot.username} is stopping current activity`,
      `Unable to stop current activity`,
    );
  }

  _doSkill(skill, opts, validation, successMessage, failureMessage) {
    let status;

    if (validation()) {
      skill.do(opts);
      bag.logStepItemSuccess(successMessage);
      status = "success";
    } else {
      bag.logStepItemError(failureMessage);
      status = "failed";
    }

    return status;
  }
}

export { Npc as default };
