"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class DigBlockSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const block =
      opts.target === "below"
        ? this.bot.blockAt(this.bot.entity.position.offset(0, -1, 0))
        : this.bot.blockAtCursor(5);

    if (!block) {
      return this.fail("There is no block to dig");
    }

    if (!this.bot.canDigBlock(block)) {
      return this.fail(`I cannot dig ${block.name}`);
    }

    await this.bot.dig(block);
    bag.logStepItemSuccess(`Dug ${block.name}`);
  }
}

export { DigBlockSkill as default };
