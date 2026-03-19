"use strict";
import bag from 'bagofcli';

class BaseAction {

  constructor(npc) {
    this.npc = npc;
  }

  getId() {
    bag.logStepItemError('Action should implement getId method!');
  }

  do(opts) {
    bag.logStepItemError('Action should implement do method!');
  }

  registerInfo(status) {
    this.npc.getRegister().setActionInfo(this.getId(), status);
  }
}

export {
  BaseAction as default
};