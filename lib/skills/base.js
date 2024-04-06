"use strict"
import bag from 'bagofcli';

class BaseSkill {

  constructor(bot) {
    this.bot = bot;
  }

  getId() {
    bag.logStepItemError('Skill should implement getId method!');
  }

  do(opts) {
    bag.logStepItemError('Skill should implement do method!');
  }

}

export {
  BaseSkill as default
};