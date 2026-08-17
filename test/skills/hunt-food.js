"use strict";
import HuntFoodSkill from "../../lib/skills/hunt-food.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("HuntFoodSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should attack the nearest food animal", () => {
    const cow = { name: "cow" };
    const bot = {
      nearestEntity: (predicate) => (predicate(cow) ? cow : null),
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new HuntFoodSkill(bot);
    skill.do({});
    assert.same(bot.pvp.attack.firstCall.args[0], cow);
  });

  it("should say nothing to hunt when no food animal is nearby", () => {
    const bot = {
      nearestEntity: () => null,
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new HuntFoodSkill(bot);
    skill.do({});
    assert.equals(
      bot.chat.firstCall.args[0],
      "There is nothing to hunt nearby",
    );
  });
});
