"use strict";
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
      this.bot.chat("There is no block to dig");
      return;
    }

    if (!this.bot.canDigBlock(block)) {
      this.bot.chat(`I cannot dig ${block.name}`);
      return;
    }

    await this.bot.dig(block);
  }
}

export { DigBlockSkill as default };
