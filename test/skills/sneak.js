"use strict";
import SneakSkill from "../../lib/skills/sneak.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SneakSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should set sneak control state to the given value", () => {
    const bot = {
      setControlState: sinon.spy(),
    };
    const skill = new SneakSkill(bot);
    skill.do({ enable: true });
    assert.equals(bot.setControlState.firstCall.args, ["sneak", true]);
    skill.do({ enable: false });
    assert.equals(bot.setControlState.secondCall.args, ["sneak", false]);
  });
});
