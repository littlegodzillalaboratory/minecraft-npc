"use strict";
import BaseSkill from './base.js';

class GuardLocationSkill extends BaseSkill {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    const status = this.bot.guardLocation(opts.posX, opts.posY, opts.posZ);
    this.registerInfo(status);
  }
}

export {
  GuardLocationSkill as default
};
