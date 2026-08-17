"use strict";
import { setTimeout } from "timers/promises";
import vec3 from "vec3";
import BaseSkill from "./base.js";

class BuildPillarSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const stepInMillis =
      opts.stepInMillis !== undefined ? opts.stepInMillis : 350;
    const item = this.bot.inventory
      .items()
      .find(
        (candidate) =>
          this.bot.registry.blocksByName[candidate.name] !== undefined,
      );

    if (!item) {
      this.bot.chat("I have no blocks to build with");
      return;
    }

    let failures = 0;

    await this.bot.equip(item, "hand");

    for (let i = 0; i < opts.height; i++) {
      this.bot.setControlState("jump", true);
      await setTimeout(stepInMillis);

      const referenceBlock = this.bot.blockAt(
        this.bot.entity.position.floored().offset(0, -1, 0),
      );

      try {
        await this.bot.placeBlock(referenceBlock, new vec3.Vec3(0, 1, 0));
      } catch (error) {
        failures += 1;
      }

      this.bot.setControlState("jump", false);
      await setTimeout(stepInMillis);
    }

    if (failures > 0) {
      this.bot.chat(`I could not place ${failures} of the pillar blocks`);
    }
  }
}

export { BuildPillarSkill as default };
