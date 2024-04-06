"use strict"
import bag from 'bagofcli';

class BaseAction {

  constructor(npc) {
    this.npc = npc;
  }

  registerInfo(status) {
    this.register.setActionInfo(this.getId(), status);
  }

  getId() {
    bag.logStepItemError('Action should implement getId method!')
  }

  do(opts) {
    bag.logStepItemError('Action should implement do method!')
  }
}

export {
  BaseAction as default
};