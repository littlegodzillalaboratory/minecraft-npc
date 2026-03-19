"use strict";
import { setTimeout } from 'timers/promises';
import BaseSkill from './base.js';

class EmptyInventorySkill extends BaseSkill {

  getId() {
    return this.constructor.name;
  }

  async do(opts) {

    console.dir(this.bot.inventory.items());
    for (const item of this.bot.inventory.items()) {
      console.log(`Tossing item: ${item.name} x ${item.count}`);
      this.bot.tossStack(item);
      // Add a delay between tosses
      await setTimeout(500);
    }
  }
}

export {
  EmptyInventorySkill as default
};