"use strict";
import EatFoodSkill from "../../lib/skills/eat-food.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EatFoodSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip and consume the matching food item", async () => {
    const apple = { name: "apple" };
    const bot = {
      inventory: { items: () => [apple] },
      equip: sinon.stub().resolves(),
      consume: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new EatFoodSkill(bot);
    await skill.do({ itemName: "apple" });
    assert.same(bot.equip.firstCall.args[0], apple);
    assert.equals(bot.equip.firstCall.args[1], "hand");
    assert.equals(bot.consume.callCount, 1);
  });

  it("should say does not have item when no food matches", async () => {
    const bot = {
      inventory: { items: () => [] },
      equip: sinon.stub().resolves(),
      consume: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new EatFoodSkill(bot);
    await skill.do({ itemName: "apple" });
    assert.equals(bot.chat.firstCall.args[0], "I do not have any apple");
    assert.equals(bot.consume.callCount, 0);
  });
});
