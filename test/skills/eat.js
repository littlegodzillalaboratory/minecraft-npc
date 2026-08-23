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

  it("should propagate mineflayer's own error when inventory has no food items", async () => {
    // mirrors what the real bot.equip() throws when handed a null/undefined
    // item, per mineflayer/lib/plugins/simple_inventory.js
    const equipStub = sinon
      .stub()
      .rejects(
        new Error(
          "Invalid item object in equip (item is null or typeof item is not object)",
        ),
      );
    const consumeStub = sinon.stub().resolves();
    const bot = {
      inventory: {
        items: () => [{ name: "stone" }],
      },
      registry: {
        foodsByName: {},
      },
      equip: equipStub,
      consume: consumeStub,
      chat: sinon.spy(),
    };
    const skill = new EatSkill(bot);
    let thrownError;
    try {
      await skill.do({});
    } catch (err) {
      thrownError = err;
    }
    assert.equals(
      thrownError.message,
      "Invalid item object in equip (item is null or typeof item is not object)",
    );
    assert.isUndefined(equipStub.firstCall.args[0]);
    assert.equals(consumeStub.callCount, 0);
  });

  it("should ignore items not present in foodsByName when filtering food", async () => {
    const equipStub = sinon
      .stub()
      .rejects(
        new Error(
          "Invalid item object in equip (item is null or typeof item is not object)",
        ),
      );
    const bot = {
      inventory: {
        items: () => [{ name: "unknown_item" }],
      },
      registry: {
        foodsByName: {},
      },
      equip: equipStub,
      consume: sinon.stub(),
      chat: sinon.spy(),
    };
    const skill = new EatSkill(bot);
    let thrownError;
    try {
      await skill.do({});
    } catch (err) {
      thrownError = err;
    }
    assert.equals(
      thrownError.message,
      "Invalid item object in equip (item is null or typeof item is not object)",
    );
    assert.isUndefined(equipStub.firstCall.args[0]);
  });
  it("should return class name as id", () => {
    const skill = new EatSkill({});
    assert.equals(skill.getId(), "EatSkill");
  });

});
