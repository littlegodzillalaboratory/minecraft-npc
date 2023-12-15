"use strict"
import bag from 'bagofcli';
import pathfinder from 'mineflayer-pathfinder';
import v from './validator.js'

class Npc {

  constructor(bot, register, opts) {
    this.bot = bot;
    this.register = register;
    this.opts = opts;
  }

  getBot() {
    return this.bot;
  }

  getOpts() {
    return this.opts;
  }

  getPosition() {
    return this.bot.entity.position;
  }

  getPlayerPosition(player) {
    console.dir(this.bot.players)
    console.log("aaaaa")
    console.dir(this.bot.players[player])
    return this.bot.players[player].entity.position;
  }

  getRegister() {
    return this.register;
  }

  guardLocation(posX, posY, posZ) {

    this.moveToLocation(posX, posY, posZ);

    let status;

    if (v.isValidCoord(posX, posY, posZ)) {

      const self = this;
      this.bot.on('physicsTick', () => {

        const filter = e =>
            e.type === 'mob' &&
            e.position.distanceTo(self.bot.entity.position) < 16 &&
            e.displayName !== 'Armor Stand'; // armor stands is considered a mob
        const entity = bot.nearestEntity(filter);
        if (entity) {
          bot.pvp.attack(entity)
        }

      });

      bag.logStepItemSuccess(`${this.bot.username} has started guarding location: ${posX} ${posY} ${posZ}`);
      status = 'success';

    } else {

      bag.logStepItemError(`Unable to guard invalid location: ${posX} ${posY} ${posZ}`);
      status = 'failed';

    }

    return status;
  }

  moveToLocation(posX, posY, posZ) {

    let status;

    if (v.isValidCoord(posX, posY, posZ)) {

      const defaultMovement = new pathfinder.Movements(this.bot);
      this.bot.pathfinder.setMovements(defaultMovement);
      this.bot.pathfinder.setGoal(new pathfinder.goals.GoalNear(posX, posY, posZ, 1));

      bag.logStepItemSuccess(`${this.bot.username} has started moving to location: ${posX} ${posY} ${posZ}`);
      status = 'success';

    } else {

      bag.logStepItemError(`Unable to move ${this.bot.username} to invalid location: ${posX} ${posY} ${posZ}`);
      status = 'failed';

    }

    return status;
  }

  sayMessage(message) {

    let status;

    if (v.isValidMessage(message)) {
      this.bot.chat(message);
      bag.logStepItemSuccess(`${this.bot.username} has said message: ${message}`);
      status = 'success';

    } else {

      bag.logStepItemError(`Unable to say invalid message: ${message}`);
      status = 'failed';

    }

    return status;
  }
}

export {
  Npc as default
};