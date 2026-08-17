"use strict";
import pathfinder from "mineflayer-pathfinder";
import vec3 from "vec3";
import BaseSkill from "./base.js";

class PlantSeedsSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const seeds = this.bot.inventory
      .items()
      .find((candidate) => candidate.name.includes("seeds"));

    if (!seeds) {
      this.bot.chat("I have no seeds to plant");
      return;
    }

    const farmlandDef = this.bot.registry.blocksByName.farmland;

    if (!farmlandDef) {
      this.bot.chat("I do not know what farmland is in this world");
      return;
    }

    const farmland = this.bot.findBlock({
      matching: [farmlandDef.id],
      maxDistance: 32,
      useExtraInfo: (candidate) => {
        const above = this.bot.blockAt(candidate.position.offset(0, 1, 0));
        return above !== null && above.name === "air";
      },
    });

    if (!farmland) {
      this.bot.chat("There is no empty farmland nearby");
      return;
    }

    const defaultMovement = new pathfinder.Movements(this.bot);
    this.bot.pathfinder.setMovements(defaultMovement);
    await this.bot.pathfinder.goto(
      new pathfinder.goals.GoalNear(
        farmland.position.x,
        farmland.position.y,
        farmland.position.z,
        2,
      ),
    );
    await this.bot.equip(seeds, "hand");
    await this.bot.placeBlock(farmland, new vec3.Vec3(0, 1, 0));
  }
}

export { PlantSeedsSkill as default };
