"use strict";
import FleeSkill from "../../lib/skills/flee.js";
import MoveToLocationSkill from "../../lib/skills/move-to-location.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FleeSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should move away from the nearest hostile mob", () => {
    const moveStub = sinon.stub(MoveToLocationSkill.prototype, "do");
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
    skill.do({});
    assert.equals(moveStub.callCount, 1);
    assert.equals(moveStub.firstCall.args[0].posX, -16);
    assert.equals(moveStub.firstCall.args[0].posZ, 0);
  });

  it("should ignore non-mob candidates and default distance when threat is on top of the bot", () => {
    const moveStub = sinon.stub(MoveToLocationSkill.prototype, "do");
    const arrow = { type: "item", position: { x: 0, y: 64, z: 0 } };
    const zombie = {
      type: "mob",
      name: "zombie",
      position: { x: 0, y: 64, z: 0 },
    };
    const bot = {
      nearestEntity: (predicate) =>
        [arrow, zombie].find(predicate) || null,
      registry: { entitiesByName: { zombie: { category: "Hostile mobs" } } },
      entity: { position: { x: 0, y: 64, z: 0 } },
      chat: sinon.spy(),
    };
    const skill = new FleeSkill(bot);
    skill.do({});
    assert.equals(moveStub.callCount, 1);
    assert.equals(moveStub.firstCall.args[0].posX, 0);
    assert.equals(moveStub.firstCall.args[0].posZ, 0);
  });

  it("should say nothing to flee from when no hostile mob is nearby", () => {
    const moveStub = sinon.stub(MoveToLocationSkill.prototype, "do");
    const bot = {
      nearestEntity: () => null,
      registry: { entitiesByName: {} },
      entity: { position: { x: 0, y: 64, z: 0 } },
      chat: sinon.spy(),
    };
    const skill = new FleeSkill(bot);
    skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "There is nothing to flee from");
    assert.equals(moveStub.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new FleeSkill({});
    assert.equals(skill.getId(), "FleeSkill");
  });

});
