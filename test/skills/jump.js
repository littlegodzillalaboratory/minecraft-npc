"use strict";
import JumpSkill from "../../lib/skills/jump.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("JumpSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should press and release jump control", async () => {
    const bot = {
      setControlState: sinon.spy(),
    };
    const skill = new JumpSkill(bot);
    await skill.do({ durationInMillis: 0 });
    assert.equals(bot.setControlState.firstCall.args, ["jump", true]);
    assert.equals(bot.setControlState.secondCall.args, ["jump", false]);
  });
});
