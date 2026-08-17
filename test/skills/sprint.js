"use strict";
import SprintSkill from "../../lib/skills/sprint.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SprintSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should sprint forward then stop", async () => {
    const bot = {
      setControlState: sinon.spy(),
    };
    const skill = new SprintSkill(bot);
    await skill.do({ durationInMillis: 0 });
    assert.equals(bot.setControlState.callCount, 4);
    assert.equals(bot.setControlState.getCall(0).args, ["sprint", true]);
    assert.equals(bot.setControlState.getCall(1).args, ["forward", true]);
    assert.equals(bot.setControlState.getCall(2).args, ["forward", false]);
    assert.equals(bot.setControlState.getCall(3).args, ["sprint", false]);
  });
});
