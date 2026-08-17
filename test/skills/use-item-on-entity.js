"use strict";
import UseItemOnEntitySkill from "../../lib/skills/use-item-on-entity.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("UseItemOnEntitySkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip the item and use it on the entity", async () => {
    const cow = { name: "cow" };
    const bucket = { name: "bucket" };
    const bot = {
      nearestEntity: (predicate) => (predicate(cow) ? cow : null),
      inventory: { items: () => [bucket] },
      equip: sinon.stub().resolves(),
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new UseItemOnEntitySkill(bot);
    await skill.do({ itemName: "bucket", entityName: "cow" });
    assert.same(bot.equip.firstCall.args[0], bucket);
    assert.same(bot.useOn.firstCall.args[0], cow);
  });

  it("should say cannot find entity when none matches", async () => {
    const bot = {
      nearestEntity: () => null,
      inventory: { items: () => [] },
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new UseItemOnEntitySkill(bot);
    await skill.do({ itemName: "bucket", entityName: "cow" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot find any cow nearby");
  });

  it("should say does not have item when no item matches", async () => {
    const cow = { name: "cow" };
    const bot = {
      nearestEntity: (predicate) => (predicate(cow) ? cow : null),
      inventory: { items: () => [] },
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new UseItemOnEntitySkill(bot);
    await skill.do({ itemName: "bucket", entityName: "cow" });
    assert.equals(bot.chat.firstCall.args[0], "I do not have any bucket");
    assert.equals(bot.useOn.callCount, 0);
  });
});
