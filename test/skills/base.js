"use strict";
import BaseSkill from "../../lib/skills/base.js";
import bag from "bagofcli";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("BaseSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should log default BaseSkill errors", () => {
    const errorStub = sinon.stub(bag, "logStepItemError");
    const skill = new BaseSkill({});
    skill.getId();
    skill.do({});
    assert.equals(errorStub.callCount, 2);
  });

  it("should defer player-facing outcomes when managed by an NPC", () => {
    const chat = sinon.spy();
    const skill = new BaseSkill({ deferSkillMessages: true, chat: chat });

    assert.equals(skill.inform("Ready"), { message: "Ready" });
    assert.exception(() => skill.fail("Unable to continue"), {
      name: "Error",
      message: "Unable to continue",
    });
    assert.equals(chat.callCount, 0);
  });

  it("should preserve standalone skill messaging", () => {
    const chat = sinon.spy();
    const skill = new BaseSkill({ chat: chat });

    assert.isUndefined(skill.inform("Ready"));
    assert.isUndefined(skill.fail("Unable to continue"));
    assert.equals(chat.callCount, 2);
  });
});
