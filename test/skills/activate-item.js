"use strict";
import ActivateItemSkill from "../../lib/skills/activate-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ActivateItemSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip and activate the matching item", async () => {
    const egg = { name: "egg" };
    const bot = {
      inventory: { items: () => [egg] },
      equip: sinon.stub().resolves(),
      activateItem: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new ActivateItemSkill(bot);
    await skill.do({ itemName: "egg" });
    assert.same(bot.equip.firstCall.args[0], egg);
    assert.equals(bot.activateItem.callCount, 1);
  });

  it("should say does not have item when no item matches", async () => {
    const bot = {
      inventory: { items: () => [] },
      activateItem: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new ActivateItemSkill(bot);
    await skill.do({ itemName: "egg" });
    assert.equals(bot.chat.firstCall.args[0], "I do not have any egg");
    assert.equals(bot.activateItem.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new ActivateItemSkill({});
    assert.equals(skill.getId(), "ActivateItemSkill");
  });

});
