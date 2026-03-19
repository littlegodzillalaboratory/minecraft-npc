"use strict";
import BaseAction from './base.js';
import bag from 'bagofcli';

class EmptyInventoryAction extends BaseAction {

  getId() {
    return this.constructor.name;
  }

  do(opts) {

    bag.logStepHeading('Emptying inventory...');
    const status = this.npc.emptyInventory();
    this.registerInfo(status);
  }
}

export {
  EmptyInventoryAction as default
};