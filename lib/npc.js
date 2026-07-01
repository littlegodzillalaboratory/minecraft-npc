"use strict";
import bag from "bagofcli";
import v from "./validator.js";
import EatSkill from "./skills/eat.js";
import EmptyInventorySkill from "./skills/empty-inventory.js";
import GuardLocationSkill from "./skills/guard-location.js";
import MessageChatGptSkill from "./skills/message-chatgpt.js";
import MoveToLocationSkill from "./skills/move-to-location.js";
import MoveBlocksDistanceToDirectionSkill from "./skills/move-blocks-distance-to-direction.js";
import MoveToObjectSkill from "./skills/move-to-object.js";
import SayMessageSkill from "./skills/say-message.js";
import SleepSkill from "./skills/sleep.js";
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

  eat() {
    const skill = new EatSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is eating`;
    const failureMessage = `Unable to eat`;

    return this._doSkill(skill, opts, validation, successMessage, failureMessage);
  }

  emptyInventory() {
    const skill = new EmptyInventorySkill(this.bot);
    const opts = {};
    const validation = () => true; // Always valid to empty inventory
    const successMessage = `${this.bot.username} is emptying inventory`;
    const failureMessage = `Unable to empty inventory`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  guardLocation(posX, posY, posZ) {
    this.moveToLocation(posX, posY, posZ);

    const skill = new GuardLocationSkill(this.bot);
    const opts = { posX: posX, posY: posY, posZ: posZ };
    const validation = () => v.isValidCoord(posX, posY, posZ);
    const successMessage = `${this.bot.username} is guarding location: ${posX} ${posY} ${posZ}`;
    const failureMessage = `Unable to guard invalid location: ${posX} ${posY} ${posZ}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  messageChatGpt(player, message) {
    const skill = new MessageChatGptSkill(this.bot);
    const opts = { message: message };
    const validation = () => v.isValidMessage(player, message);
    const successMessage = `${this.bot.username} is sending ChatGPT message: ${message}`;
    const failureMessage = `Unable to send invalid message: ${message}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  moveToLocation(posX, posY, posZ) {
    const skill = new MoveToLocationSkill(this.bot);
    const opts = { posX: posX, posY: posY, posZ: posZ };
    const validation = () => v.isValidCoord(posX, posY, posZ);
    const successMessage = `${this.bot.username} is moving to location: ${posX} ${posY} ${posZ}`;
    const failureMessage = `Unable to move ${this.bot.username} to invalid location: ${posX} ${posY} ${posZ}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  moveToObject(objectName) {
    const skill = new MoveToObjectSkill(this.bot);
    const opts = { objectName: objectName };
    const validation = () => v.isValidMessage(objectName);
    const successMessage = `${this.bot.username} is moving to object: ${objectName}`;
    const failureMessage = `Unable to move ${this.bot.username} to invalid object: ${objectName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  moveBlocksDistanceToDirection(distance, direction) {
    const skill = new MoveBlocksDistanceToDirectionSkill(this.bot);
    const opts = { distance: distance, direction: direction };
    const validation = () => v.isValidMoveDirection(distance, direction);
    const successMessage = `${this.bot.username} is moving ${distance} blocks ${direction}`;
    const failureMessage = `Unable to move ${this.bot.username} ${distance} blocks ${direction}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
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

  sleep() {
    const skill = new SleepSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is going to sleep`;
    const failureMessage = `Unable to sleep`;

    return this._doSkill(skill, opts, validation, successMessage, failureMessage);
  }

  stop() {
    const skill = new StopSkill(this.bot);
    const opts = {};
    const validation = () => true; // Always valid to stop current bot activity
    const successMessage = `${this.bot.username} is stopping current activity`;
    const failureMessage = `Unable to stop current activity`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
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
