"use strict";
import EquipItemSkill from "../../lib/skills/equip-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EquipItemSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip a matching item to the destination", async () => {
    const sword = { name: "iron_sword" };
    const bot = {
      inventory: { items: () => [sword] },
      equip: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new EquipItemSkill(bot);
    await skill.do({ itemName: "sword", destination: "hand" });
    assert.same(bot.equip.firstCall.args[0], sword);
    assert.equals(bot.equip.firstCall.args[1], "hand");
    assert.equals(bot.chat.callCount, 0);
  });

  it("should say does not have item when no item matches", async () => {
    const bot = {
      inventory: { items: () => [] },
      equip: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new EquipItemSkill(bot);
    await skill.do({ itemName: "sword", destination: "hand" });
    assert.equals(bot.chat.firstCall.args[0], "I do not have any sword");
    assert.equals(bot.equip.callCount, 0);
  });

  it("should propagate the error when equip rejects", async () => {
    const bot = {
      inventory: { items: () => [{ name: "iron_sword" }] },
      equip: sinon.stub().rejects(new Error("someerror")),
      chat: sinon.spy(),
    };
    const skill = new EquipItemSkill(bot);
    let thrownError;
    try {
      await skill.do({ itemName: "sword", destination: "hand" });
    } catch (err) {
      thrownError = err;
    }
    assert.equals(thrownError.message, "someerror");
    assert.equals(bot.chat.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new EquipItemSkill({});
    assert.equals(skill.getId(), "EquipItemSkill");
  });

});
