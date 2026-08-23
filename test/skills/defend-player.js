"use strict";
import DefendPlayerSkill from "../../lib/skills/defend-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DefendPlayerSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should attack hostile mob near the player", () => {
    const zombie = {
      type: "mob",
      name: "zombie",
      position: { distanceTo: () => 5 },
    };
    const bot = {
      players: { alice: { entity: { position: {} } } },
      entities: { 1: zombie },
      registry: { entitiesByName: { zombie: { category: "Hostile mobs" } } },
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new DefendPlayerSkill(bot);
    skill.do({ player: "alice" });
    assert.same(bot.pvp.attack.firstCall.args[0], zombie);
  });

  it("should say player is safe when no hostile mob is near", () => {
    const bot = {
      players: { alice: { entity: { position: {} } } },
      entities: {},
      registry: { entitiesByName: {} },
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new DefendPlayerSkill(bot);
    skill.do({ player: "alice" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "You are safe, there are no threats nearby",
    );
  });

  it("should ignore non-mob entities and unregistered mobs", () => {
    const arrow = { type: "item", position: { distanceTo: () => 5 } };
    const unknownMob = {
      type: "mob",
      name: "unknown_mob",
      position: { distanceTo: () => 5 },
    };
    const bot = {
      players: { alice: { entity: { position: {} } } },
      entities: { 1: arrow, 2: unknownMob },
      registry: { entitiesByName: {} },
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new DefendPlayerSkill(bot);
    skill.do({ player: "alice" });
    assert.equals(bot.pvp.attack.callCount, 0);
    assert.equals(
      bot.chat.firstCall.args[0],
      "You are safe, there are no threats nearby",
    );
  });

  it("should say cannot see player when player entity is missing", () => {
    const bot = {
      players: {},
      entities: {},
      registry: { entitiesByName: {} },
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new DefendPlayerSkill(bot);
    skill.do({ player: "alice" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot see you, alice");
  });
  it("should return class name as id", () => {
    const skill = new DefendPlayerSkill({});
    assert.equals(skill.getId(), "DefendPlayerSkill");
  });

});
