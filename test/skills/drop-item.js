"use strict";
import DropItemSkill from "../../lib/skills/drop-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DropItemSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should toss the matching item", async () => {
    const bot = {
      inventory: { items: () => [{ name: "iron_sword", type: 42, count: 1 }] },
      toss: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new DropItemSkill(bot);
    await skill.do({ itemName: "sword" });
    assert.equals(bot.toss.firstCall.args, [42, null, 1]);
  });

  it("should match a plural item name against singular item", async () => {
    const bot = {
      inventory: { items: () => [{ name: "torch", type: 50, count: 3 }] },
      toss: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new DropItemSkill(bot);
    await skill.do({ itemName: "torches" });
    assert.equals(bot.toss.firstCall.args, [50, null, 3]);
  });

  it("should say does not have item when no item matches", async () => {
    const bot = {
      inventory: { items: () => [] },
      toss: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new DropItemSkill(bot);
    await skill.do({ itemName: "sword" });
    assert.equals(bot.chat.firstCall.args[0], "I do not have any sword");
    assert.equals(bot.toss.callCount, 0);
  });
});
