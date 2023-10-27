"use strict"
import _ from 'lodash';
import Action from './base-action.js';
import bag from 'bagofcli';
import pathfinder from 'mineflayer-pathfinder';

class InitLocation extends Action {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const coordX = opts.coordX;
    const coordY = opts.coordY;
    const coordZ = opts.coordZ;

    let status;

    bag.logStepHeading('Moving to initial location...');
    if (_.isNumber(coordX) && _.isNumber(coordY) && _.isNumber(coordZ)) {
  
      const defaultMovement = new pathfinder.Movements(this.bot);
      this.bot.pathfinder.setMovements(defaultMovement);
  
      this.bot.pathfinder.setGoal(new pathfinder.goals.GoalNear(coordX, coordY, coordZ, 1));
      bag.logStepItemSuccess(`${this.bot.username} has moved to initial location: ${coordX} ${coordY} ${coordZ}`);
      status = 'success';
  
    } else {
      bag.logStepItemError(`Unable to move ${this.bot.username} to invalid location: ${coordX} ${coordY} ${coordZ}`);
      status = 'failed';
    }

    this.register.setActionInfo(this.getId(), status, Date.now());
  }
}

export {
  InitLocation as default
};
