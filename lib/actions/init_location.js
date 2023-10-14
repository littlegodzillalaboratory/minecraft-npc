"use strict"
import _ from 'lodash';
import bag from 'bagofcli';
import pathfinder from 'mineflayer-pathfinder';

function exec(bot, coordX, coordY, coordZ) {
  bag.logStepHeading('Moving to initial location...');
  if (_.isNumber(coordX) && _.isNumber(coordY) && _.isNumber(coordZ)) {

    const defaultMovement = new pathfinder.Movements(bot);
    bot.pathfinder.setMovements(defaultMovement);

    bot.pathfinder.setGoal(new pathfinder.goals.GoalNear(coordX, coordY, coordZ, 1));
    bag.logStepItemSuccess(`${bot.username} has moved to initial location: ${coordX} ${coordY} ${coordZ}`);

  } else {
    bag.logStepItemError(`Unable to move ${bot.username} to invalid location: ${coordX} ${coordY} ${coordZ}`);
  }
}

export {
  exec as default
};
