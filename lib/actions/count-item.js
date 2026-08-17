"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";

class CountItemAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const itemName = opts.messageElems[1].trim();
    const query = itemName.toLowerCase().replaceAll(" ", "_");
    const singular = query.replace(/e?s$/, "");
    const bot = this.npc.getBot();
    const count = bot.inventory
      .items()
      .filter(
        (item) => item.name.includes(query) || item.name.includes(singular),
      )
      .reduce((total, item) => total + item.count, 0);

    bag.logStepHeading(`Counting item: ${itemName}...`);
    const status = await this.npc.sayMessage(`I have ${count} ${itemName}`);
    this.registerInfo(status);
  }
}

export { CountItemAction as default };
