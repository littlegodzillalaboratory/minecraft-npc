"use strict";
import TossHeldItemSkill from "../../lib/skills/toss-held-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("TossHeldItemSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should toss the held item stack", async () => {
    const heldItem = { name: "stone" };
    const bot = {
      heldItem,
      tossStack: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new TossHeldItemSkill(bot);
    await skill.do({});
    assert.same(bot.tossStack.firstCall.args[0], heldItem);
  });

  it("should say not holding anything when hand is empty", async () => {
    const bot = {
      heldItem: null,
      tossStack: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new TossHeldItemSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "I am not holding anything");
    assert.equals(bot.tossStack.callCount, 0);
  });
});
