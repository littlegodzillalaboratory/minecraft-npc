"use strict";
import DismountSkill from "../../lib/skills/dismount.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DismountSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should dismount when riding a vehicle", () => {
    const bot = {
      vehicle: { name: "horse" },
      dismount: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new DismountSkill(bot);
    skill.do({});
    assert.equals(bot.dismount.callCount, 1);
  });

  it("should say not riding anything when there is no vehicle", () => {
    const bot = {
      vehicle: null,
      dismount: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new DismountSkill(bot);
    skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "I am not riding anything");
    assert.equals(bot.dismount.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new DismountSkill({});
    assert.equals(skill.getId(), "DismountSkill");
  });

});
