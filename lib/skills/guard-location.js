"use strict";
import bag from "bagofcli";
import pathfinder from "mineflayer-pathfinder";

import BaseSkill from "./base.js";

const GUARD_RADIUS = 30;
const RETURN_RANGE = 1;
const SCAN_INTERVAL_TICKS = 20;

class GuardLocationSkill extends BaseSkill {
  getId() {
    return this.constructor.name;
  }

  /**
   * Maintain a defensive post until its controller is stopped. The guard
   * periodically acquires nearby hostiles, limits pursuit to the guarded area,
   * and returns to the post after combat.
   */
  do(opts) {
    this.bot.guardController?.stop();

    const guardPosition = {
      x: opts.posX,
      y: opts.posY,
      z: opts.posZ,
    };
    const state = {
      active: true,
      attackStarting: false,
      attackStopping: false,
      ticks: 0,
    };

    const distanceFromGuard = (position) => {
      const dx = position.x - guardPosition.x;
      const dy = position.y - guardPosition.y;
      const dz = position.z - guardPosition.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    const isHostileWithinGuardRadius = (entity) => {
      return this.isVisibleThreat(entity, GUARD_RADIUS, guardPosition);
    };

    const returnToGuardPosition = () => {
      if (!state.active || !this.bot.pathfinder?.setGoal) return;
      this.bot.pathfinder.setGoal(
        new pathfinder.goals.GoalNear(
          guardPosition.x,
          guardPosition.y,
          guardPosition.z,
          RETURN_RANGE,
        ),
      );
    };

    const scan = () => {
      if (!state.active) return;

      const target = this.bot.pvp.target;
      if (target) {
        const leftGuardArea =
          distanceFromGuard(target.position) > GUARD_RADIUS ||
          distanceFromGuard(this.bot.entity.position) > GUARD_RADIUS;
        if (leftGuardArea && !state.attackStopping) {
          state.attackStopping = true;
          Promise.resolve(this.bot.pvp.stop()).finally(() => {
            state.attackStopping = false;
            returnToGuardPosition();
          });
        }
        return;
      }

      const hostileEntity = Object.values(this.bot.entities).find(
        isHostileWithinGuardRadius,
      );
      if (hostileEntity && !state.attackStarting) {
        state.attackStarting = true;
        Promise.resolve(this.bot.pvp.attack(hostileEntity)).finally(() => {
          state.attackStarting = false;
        });
      } else if (
        !hostileEntity &&
        distanceFromGuard(this.bot.entity.position) > RETURN_RANGE
      ) {
        returnToGuardPosition();
      }
    };

    const onPhysicsTick = () => {
      state.ticks += 1;
      if (state.ticks >= SCAN_INTERVAL_TICKS) {
        state.ticks = 0;
        scan();
      }
    };
    const onStoppedAttacking = () => {
      returnToGuardPosition();
    };

    this.bot.on("entitySpawn", scan);
    this.bot.on("physicTick", onPhysicsTick);
    this.bot.on("stoppedAttacking", onStoppedAttacking);
    // Store the controller on the bot because skill instances are short-lived,
    // while guarding continues across Mineflayer events after this call ends.
    this.bot.guardController = {
      stop: () => {
        state.active = false;
        this.bot.removeListener("entitySpawn", scan);
        this.bot.removeListener("physicTick", onPhysicsTick);
        this.bot.removeListener("stoppedAttacking", onStoppedAttacking);
        delete this.bot.guardController;
      },
    };

    scan();
    bag.logStepItemSuccess(
      `Started guarding ${guardPosition.x}, ${guardPosition.y}, ${guardPosition.z}`,
    );
  }
}

export { GuardLocationSkill as default };
