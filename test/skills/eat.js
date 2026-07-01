"use strict";
import EatSkill from "../../lib/skills/eat.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EatSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip and consume the highest food-point item when food is available", async () => {
    const cookedBeef = { name: "cooked_beef" };
    const carrot = { name: "carrot" };
    const equipStub = sinon.stub().resolves();
    const consumeStub = sinon.stub().resolves();
    const bot = {
      inventory: {
        items: () => [cookedBeef, carrot],
      },
      registry: {
        foodsByName: {
          cooked_beef: { foodPoints: 8 },
          carrot: { foodPoints: 3 },
        },
      },
      equip: equipStub,
      consume: consumeStub,
      chat: sinon.spy(),
    };
    const skill = new EatSkill(bot);
    await skill.do({});
    assert.equals(equipStub.firstCall.args[0], cookedBeef);
    assert.equals(equipStub.firstCall.args[1], "hand");
    assert.equals(consumeStub.callCount, 1);
    assert.equals(bot.chat.callCount, 0);
  });

  it("should say I have no food when inventory has no food items", async () => {
    const bot = {
      inventory: {
        items: () => [{ name: "stone" }],
      },
      registry: {
        foodsByName: {},
      },
      equip: sinon.stub(),
      consume: sinon.stub(),
      chat: sinon.spy(),
    };
    const skill = new EatSkill(bot);
    await skill.do({});
    assert.equals(bot.equip.callCount, 0);
    assert.equals(bot.consume.callCount, 0);
    assert.equals(bot.chat.firstCall.args[0], "I have no food.");
  });

  it("should ignore items not present in foodsByName when filtering food", async () => {
    const bot = {
      inventory: {
        items: () => [{ name: "unknown_item" }],
      },
      registry: {
        foodsByName: {},
      },
      equip: sinon.stub(),
      consume: sinon.stub(),
      chat: sinon.spy(),
    };
    const skill = new EatSkill(bot);
    await skill.do({});
    assert.equals(bot.equip.callCount, 0);
    assert.equals(bot.chat.firstCall.args[0], "I have no food.");
  });
});
