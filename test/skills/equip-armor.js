"use strict";
import EquipArmorSkill from "../../lib/skills/equip-armor.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EquipArmorSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip every armor piece found in inventory", async () => {
    const helmet = { name: "iron_helmet" };
    const boots = { name: "leather_boots" };
    const bot = {
      inventory: { items: () => [helmet, boots] },
      equip: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new EquipArmorSkill(bot);
    await skill.do({});
    assert.equals(bot.equip.callCount, 2);
    assert.same(bot.equip.firstCall.args[0], helmet);
    assert.equals(bot.equip.firstCall.args[1], "head");
    assert.same(bot.equip.secondCall.args[0], boots);
    assert.equals(bot.equip.secondCall.args[1], "feet");
    assert.equals(bot.chat.callCount, 0);
  });

  it("should say no armor when inventory has none", async () => {
    const bot = {
      inventory: { items: () => [{ name: "stone" }] },
      equip: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new EquipArmorSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "I have no armor to wear");
    assert.equals(bot.equip.callCount, 0);
  });
});
