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
});
