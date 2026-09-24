"use strict";
import { EventEmitter } from "node:events";

import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

import GuardLocationSkill from "../../lib/skills/guard-location.js";

const assert = referee.assert;

describe("GuardLocationSkill", () => {
  const guardPosition = { posX: 0, posY: 64, posZ: 0 };
  let originalGoalNear;

  const createBot = (entities = {}) => {
    const bot = new EventEmitter();
    bot.entity = { position: { x: 0, y: 64, z: 0 } };
    bot.registry = {
      entitiesByName: {
        zombie: { category: "Hostile mobs" },
        cow: { category: "Passive mobs" },
      },
    };
    bot.entities = entities;
    bot.pathfinder = { setGoal: sinon.spy() };
    bot.pvp = {
      target: undefined,
      attack: sinon.stub().resolves(),
      stop: sinon.stub().resolves(),
    };
    return bot;
  };

  beforeEach(() => {
    originalGoalNear = pathfinder.goals.GoalNear;
    pathfinder.goals.GoalNear = class {
      constructor(x, y, z, range) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.range = range;
      }
    };
  });

  afterEach(() => {
    pathfinder.goals.GoalNear = originalGoalNear;
    sinon.restore();
  });

  it("should attack a hostile mob already inside the guard radius", () => {
    const zombie = {
      type: "hostile",
      name: "zombie",
      position: { x: 5, y: 64, z: 5 },
    };
    const bot = createBot({ zombie: zombie });

    new GuardLocationSkill(bot).do(guardPosition);

    assert.equals(bot.pvp.attack.callCount, 1);
    assert.same(bot.pvp.attack.firstCall.args[0], zombie);
  });

  it("should detect hostiles that spawn after guarding starts", () => {
    const bot = createBot();
    new GuardLocationSkill(bot).do(guardPosition);
    const zombie = {
      type: "hostile",
      name: "zombie",
      position: { x: 5, y: 64, z: 5 },
    };
    bot.entities.zombie = zombie;

    bot.emit("entitySpawn", zombie);

    assert.equals(bot.pvp.attack.callCount, 1);
  });

  it("should periodically scan while guarding", () => {
    const bot = createBot();
    new GuardLocationSkill(bot).do(guardPosition);
    const zombie = {
      type: "mob",
      name: "zombie",
      position: { x: 5, y: 64, z: 5 },
    };
    bot.entities.zombie = zombie;

    for (let tick = 0; tick < 19; tick += 1) bot.emit("physicTick");
    assert.equals(bot.pvp.attack.callCount, 0);
    bot.emit("physicTick");
    assert.equals(bot.pvp.attack.callCount, 1);
  });

  it("should ignore passive, distant, and non-mob entities", () => {
    const bot = createBot({
      cow: {
        type: "mob",
        name: "cow",
        position: { x: 5, y: 64, z: 5 },
      },
      distantZombie: {
        type: "hostile",
        name: "zombie",
        position: { x: 200, y: 64, z: 200 },
      },
      arrow: {
        type: "item",
        position: { x: 5, y: 64, z: 5 },
      },
    });

    new GuardLocationSkill(bot).do(guardPosition);

    assert.equals(bot.pvp.attack.callCount, 0);
  });

  it("should stop pursuit outside the guard radius and return to the post", async () => {
    const bot = createBot();
    bot.pvp.target = {
      position: { x: 40, y: 64, z: 0 },
    };
    new GuardLocationSkill(bot).do(guardPosition);

    bot.emit("entitySpawn");
    await Promise.resolve();

    assert.equals(bot.pvp.stop.callCount, 1);
    assert.equals(bot.pathfinder.setGoal.callCount, 1);
    assert.equals(bot.pathfinder.setGoal.firstCall.args[0].x, 0);
    assert.equals(bot.pathfinder.setGoal.firstCall.args[0].range, 1);
  });

  it("should keep pursuing a target while both remain in the guard area", () => {
    const bot = createBot();
    bot.pvp.target = {
      position: { x: 5, y: 64, z: 0 },
    };

    new GuardLocationSkill(bot).do(guardPosition);

    assert.equals(bot.pvp.stop.callCount, 0);
  });

  it("should return when displaced or after combat stops", () => {
    const bot = createBot();
    bot.entity.position.x = 5;
    new GuardLocationSkill(bot).do(guardPosition);

    assert.equals(bot.pathfinder.setGoal.callCount, 1);
    bot.emit("stoppedAttacking");
    assert.equals(bot.pathfinder.setGoal.callCount, 2);
  });

  it("should replace and dispose an existing guard controller", () => {
    const bot = createBot();
    const oldStop = sinon.spy();
    bot.guardController = { stop: oldStop };
    const skill = new GuardLocationSkill(bot);
    skill.do(guardPosition);
    const controller = bot.guardController;
    const staleScan = bot.listeners("entitySpawn")[0];

    assert.equals(oldStop.callCount, 1);
    assert.equals(bot.listenerCount("physicTick"), 1);
    controller.stop();
    assert.equals(bot.listenerCount("entitySpawn"), 0);
    assert.equals(bot.listenerCount("physicTick"), 0);
    assert.equals(bot.listenerCount("stoppedAttacking"), 0);
    assert.isUndefined(bot.guardController);
    staleScan();
    assert.equals(bot.pvp.attack.callCount, 0);
  });

  it("should tolerate a missing pathfinder while stopping", () => {
    const bot = createBot();
    delete bot.pathfinder;
    new GuardLocationSkill(bot).do(guardPosition);

    bot.emit("stoppedAttacking");
  });

  it("should return class name as id", () => {
    const skill = new GuardLocationSkill({});
    assert.equals(skill.getId(), "GuardLocationSkill");
  });
});
