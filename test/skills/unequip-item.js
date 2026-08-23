"use strict";
import UnequipItemSkill from "../../lib/skills/unequip-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("UnequipItemSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should unequip the hand", async () => {
    const bot = {
      unequip: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new UnequipItemSkill(bot);
    await skill.do({});
    assert.equals(bot.unequip.firstCall.args[0], "hand");
    assert.equals(bot.chat.callCount, 0);
  });

  it("should propagate the error when unequip rejects", async () => {
    const bot = {
      unequip: sinon.stub().rejects(new Error("someerror")),
      chat: sinon.spy(),
    };
    const skill = new UnequipItemSkill(bot);
    let thrownError;
    try {
      await skill.do({});
    } catch (err) {
      thrownError = err;
    }
    assert.equals(thrownError.message, "someerror");
    assert.equals(bot.chat.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new UnequipItemSkill({});
    assert.equals(skill.getId(), "UnequipItemSkill");
  });

});
