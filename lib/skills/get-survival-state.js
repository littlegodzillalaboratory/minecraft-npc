"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class GetSurvivalStateSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /** Return the observations needed by deterministic survival policy. */
  do(opts) {
    const foodCount = this.bot.inventory
      .items()
      .filter((item) => this.bot.registry.foodsByName[item.name])
      .reduce((total, item) => total + item.count, 0);
    const nearbyThreats = Object.values(this.bot.entities)
      .filter((entity) => this.isVisibleThreat(entity, opts.threatRadius))
      .map((entity) => ({
        name: entity.name,
        distance: Math.round(
          this.getDistance(entity.position, this.bot.entity.position),
        ),
      }))
      .sort((left, right) => left.distance - right.distance);

    const state = {
      health: this.bot.health,
      hunger: this.bot.food,
      foodCount: foodCount,
      nearbyThreats: nearbyThreats,
      timeOfDay: this.bot.time.timeOfDay,
      position: this.bot.entity.position,
    };
    bag.logStepItemSuccess("Checked the current survival state");
    return state;
  }
}

export { GetSurvivalStateSkill as default };
