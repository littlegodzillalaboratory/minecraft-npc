"use strict";
import bag from "bagofcli";
import BaseSkill from "./base.js";

class DefendPlayerSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  do(opts) {
    const DEFEND_RADIUS = 16;
    const playerEntity =
      this.bot.players[opts.player] && this.bot.players[opts.player].entity;

    if (!playerEntity) {
      return this.fail(`I cannot see you, ${opts.player}`);
    }

    const hostileEntity = Object.values(this.bot.entities).find((entity) => {
      return this.isVisibleThreat(entity, DEFEND_RADIUS, playerEntity.position);
    });

    if (hostileEntity) {
      this.bot.pvp.attack(hostileEntity);
      bag.logStepItemSuccess(
        `Started defending ${opts.player} from ${hostileEntity.name}`,
      );
    } else {
      bag.logStepItemSuccess(`Confirmed ${opts.player} is safe`);
      return this.inform("You are safe, there are no threats nearby");
    }
  }
}

export { DefendPlayerSkill as default };
