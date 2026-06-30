"use strict";
import SayMessageSkill from "../../lib/skills/say-message.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayMessageSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayMessageSkill", () => {
    const chat = sinon.spy();
    const skill = new SayMessageSkill({ chat });
    skill.do({ message: "hello" });
    assert.equals(chat.firstCall.args[0], "hello");
  });
});
