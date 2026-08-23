"use strict";
import FishSkill from "../../lib/skills/fish.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FishSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip the fishing rod and fish", async () => {
    const rod = { name: "fishing_rod" };
    const bot = {
      inventory: { items: () => [rod] },
      equip: sinon.stub().resolves(),
      fish: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new FishSkill(bot);
    await skill.do({});
    assert.same(bot.equip.firstCall.args[0], rod);
    assert.equals(bot.fish.callCount, 1);
    assert.equals(bot.chat.firstCall.args[0], "I caught something!");
  });

  it("should say no fishing rod when inventory has none", async () => {
    const bot = {
      inventory: { items: () => [] },
      fish: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new FishSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "I have no fishing rod");
    assert.equals(bot.fish.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new FishSkill({});
    assert.equals(skill.getId(), "FishSkill");
  });

});
