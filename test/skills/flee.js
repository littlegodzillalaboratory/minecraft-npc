"use strict";
import FleeSkill from "../../lib/skills/flee.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FleeSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should move away from the nearest hostile mob", () => {
    const zombie = {
      type: "mob",
      name: "zombie",
      position: { x: 10, y: 64, z: 0 },
    };
    const bot = {
      nearestEntity: (predicate) => (predicate(zombie) ? zombie : null),
      registry: { entitiesByName: { zombie: { category: "Hostile mobs" } } },
      entity: { position: { x: 0, y: 64, z: 0 } },
      chat: sinon.spy(),
    };
    const skill = new FleeSkill(bot);
    const destination = skill.do({});
    assert.equals(destination.posX, -16);
    assert.equals(destination.posZ, 0);
  });

  it("should use registry category regardless of the entity type", () => {
    const arrow = {
      type: "item",
      name: "arrow",
      position: { x: 0, y: 64, z: 0 },
    };
    const zombie = {
      type: "hostile",
      name: "zombie",
      position: { x: 0, y: 64, z: 0 },
    };
    const bot = {
      nearestEntity: (predicate) => [arrow, zombie].find(predicate) || null,
      registry: {
        entitiesByName: {
          arrow: { category: "Projectiles" },
          zombie: { category: "Hostile mobs" },
        },
      },
      entity: { position: { x: 0, y: 64, z: 0 } },
      chat: sinon.spy(),
    };
    const skill = new FleeSkill(bot);
    const destination = skill.do({});
    assert.equals(destination.posX, 0);
    assert.equals(destination.posZ, 0);
  });

  it("should say nothing to flee from when no hostile mob is nearby", () => {
    const bot = {
      nearestEntity: () => null,
      registry: { entitiesByName: {} },
      entity: { position: { x: 0, y: 64, z: 0 } },
      chat: sinon.spy(),
    };
    const skill = new FleeSkill(bot);
    skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "There is nothing to flee from");
  });
  it("should return class name as id", () => {
    const skill = new FleeSkill({});
    assert.equals(skill.getId(), "FleeSkill");
  });
});
