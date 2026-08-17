"use strict";
import FeedAnimalSkill from "../../lib/skills/feed-animal.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FeedAnimalSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should feed the animal its preferred food", async () => {
    const cow = { name: "cow" };
    const wheat = { name: "wheat" };
    const bot = {
      nearestEntity: (predicate) => (predicate(cow) ? cow : null),
      inventory: { items: () => [{ name: "stone" }, wheat] },
      equip: sinon.stub().resolves(),
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new FeedAnimalSkill(bot);
    await skill.do({ entityName: "cow" });
    assert.same(bot.equip.firstCall.args[0], wheat);
    assert.same(bot.useOn.firstCall.args[0], cow);
  });

  it("should say cannot find animal when none matches", async () => {
    const bot = {
      nearestEntity: () => null,
      inventory: { items: () => [] },
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new FeedAnimalSkill(bot);
    await skill.do({ entityName: "cow" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot find any cow nearby");
  });

  it("should say no food for the animal when inventory lacks it", async () => {
    const cow = { name: "cow" };
    const bot = {
      nearestEntity: (predicate) => (predicate(cow) ? cow : null),
      inventory: { items: () => [{ name: "stone" }] },
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new FeedAnimalSkill(bot);
    await skill.do({ entityName: "cow" });
    assert.equals(bot.chat.firstCall.args[0], "I have no food for the cow");
    assert.equals(bot.useOn.callCount, 0);
  });
});
