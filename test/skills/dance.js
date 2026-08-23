"use strict";
import DanceSkill from "../../lib/skills/dance.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DanceSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should toggle dance moves on and off", async () => {
    const bot = {
      setControlState: sinon.spy(),
    };
    const skill = new DanceSkill(bot);
    await skill.do({ stepInMillis: 0 });
    assert.equals(bot.setControlState.callCount, 8);
    assert.equals(bot.setControlState.getCall(0).args, ["jump", true]);
    assert.equals(bot.setControlState.getCall(1).args, ["jump", false]);
    assert.equals(bot.setControlState.getCall(2).args, ["sneak", true]);
    assert.equals(bot.setControlState.getCall(3).args, ["sneak", false]);
  });
  it("should default the step delay when not specified", async function () {
    this.timeout(15000);
    const bot = {
      setControlState: sinon.spy(),
    };
    const skill = new DanceSkill(bot);
    await skill.do({});
    assert.equals(bot.setControlState.callCount, 8);
  });

  it("should return class name as id", () => {
    const skill = new DanceSkill({});
    assert.equals(skill.getId(), "DanceSkill");
  });

});
