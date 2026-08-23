"use strict";
import GuardLocationSkill from "../../lib/skills/guard-location.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("GuardLocationSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run GuardLocationSkill and attack hostile mob entity within radius", () => {
    const zombie = {
      type: "mob",
      name: "zombie",
      position: { x: 5, y: 64, z: 5 },
    };
    const pvpAttack = sinon.spy();
    const bot = {
      registry: { entitiesByName: { zombie: { category: "Hostile mobs" } } },
      entities: { 1: zombie },
      pvp: { attack: pvpAttack },
    };
    const skill = new GuardLocationSkill(bot);
    skill.do({ posX: 0, posY: 64, posZ: 0 });
    assert.equals(pvpAttack.callCount, 1);
    assert.same(pvpAttack.firstCall.args[0], zombie);
  });

  it("should run GuardLocationSkill and not attack passive mob entity within radius", () => {
    const cow = { type: "mob", name: "cow", position: { x: 5, y: 64, z: 5 } };
    const pvpAttack = sinon.spy();
    const bot = {
      registry: { entitiesByName: { cow: { category: "Passive mobs" } } },
      entities: { 1: cow },
      pvp: { attack: pvpAttack },
    };
    const skill = new GuardLocationSkill(bot);
    skill.do({ posX: 0, posY: 64, posZ: 0 });
    assert.equals(pvpAttack.callCount, 0);
  });

  it("should run GuardLocationSkill and not attack hostile mob entity outside radius", () => {
    const farZombie = {
      type: "mob",
      name: "zombie",
      position: { x: 200, y: 64, z: 200 },
    };
    const pvpAttack = sinon.spy();
    const bot = {
      registry: { entitiesByName: { zombie: { category: "Hostile mobs" } } },
      entities: { 1: farZombie },
      pvp: { attack: pvpAttack },
    };
    const skill = new GuardLocationSkill(bot);
    skill.do({ posX: 0, posY: 64, posZ: 0 });
    assert.equals(pvpAttack.callCount, 0);
  });

  it("should run GuardLocationSkill and ignore non-mob entities", () => {
    const arrow = { type: "item", position: { x: 5, y: 64, z: 5 } };
    const pvpAttack = sinon.spy();
    const bot = {
      registry: { entitiesByName: {} },
      entities: { 1: arrow },
      pvp: { attack: pvpAttack },
    };
    const skill = new GuardLocationSkill(bot);
    skill.do({ posX: 0, posY: 64, posZ: 0 });
    assert.equals(pvpAttack.callCount, 0);
  });

  it("should run GuardLocationSkill and do nothing when no entities are present", () => {
    const pvpAttack = sinon.spy();
    const bot = {
      registry: { entitiesByName: {} },
      entities: {},
      pvp: { attack: pvpAttack },
    };
    const skill = new GuardLocationSkill(bot);
    skill.do({ posX: 0, posY: 64, posZ: 0 });
    assert.equals(pvpAttack.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new GuardLocationSkill({});
    assert.equals(skill.getId(), "GuardLocationSkill");
  });

});
