"use strict";
import SwingArmSkill from "../../lib/skills/swing-arm.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SwingArmSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should swing the right arm", () => {
    const bot = {
      swingArm: sinon.spy(),
    };
    const skill = new SwingArmSkill(bot);
    skill.do({});
    assert.equals(bot.swingArm.firstCall.args[0], "right");
  });
  it("should return class name as id", () => {
    const skill = new SwingArmSkill({});
    assert.equals(skill.getId(), "SwingArmSkill");
  });

});
