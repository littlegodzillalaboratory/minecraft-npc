"use strict";
import StopSkill from "../../lib/skills/stop.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("StopSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run StopSkill with available bot controls", () => {
    const bot = {
      pathfinder: {
        stop: sinon.spy(),
        setGoal: sinon.spy(),
      },
      pvp: {
        stop: sinon.spy(),
      },
      clearControlStates: sinon.spy(),
    };
    const skill = new StopSkill(bot);
    skill.do({});
    assert.equals(bot.pathfinder.stop.callCount, 1);
    assert.equals(bot.pathfinder.setGoal.callCount, 1);
    assert.equals(bot.pvp.stop.callCount, 1);
    assert.equals(bot.clearControlStates.callCount, 1);
  });

  it("should run StopSkill when controls are unavailable", () => {
    const skill = new StopSkill({});
    skill.do({});
    assert.isTrue(true);
  });
});
