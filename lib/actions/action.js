"use strict"
import bag from 'bagofcli';

class Action {

  constructor(register, bot) {
    this.register = register;
    this.bot = bot;
  }

  registerInfo(status) {
    this.register.setActionInfo(this.getId(), status, Date.now());
  }

  getId() {
    bag.logStepItemError('Action should implement getId method!')
  }

}

export {
  Action as default
};