"use strict";
import AttackNearestEntitySkill from "../../lib/skills/attack-nearest-entity.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("AttackNearestEntitySkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should attack the nearest matching entity", () => {
    const zombie = { name: "zombie" };
    const bot = {
      nearestEntity: (predicate) => (predicate(zombie) ? zombie : null),
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new AttackNearestEntitySkill(bot);
    skill.do({ entityName: "zombie" });
    assert.same(bot.pvp.attack.firstCall.args[0], zombie);
  });

  it("should say cannot find entity when no entity matches", () => {
    const bot = {
      nearestEntity: () => null,
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new AttackNearestEntitySkill(bot);
    skill.do({ entityName: "zombie" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "I cannot find any zombie nearby",
    );
    assert.equals(bot.pvp.attack.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new AttackNearestEntitySkill({});
    assert.equals(skill.getId(), "AttackNearestEntitySkill");
  });

});
