"use strict";
import MoveToLocationSkill from "../../lib/skills/move-to-location.js";
import WanderSkill from "../../lib/skills/wander.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("WanderSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should move to a random nearby location", () => {
    const moveStub = sinon.stub(MoveToLocationSkill.prototype, "do");
    const bot = {
      entity: { position: { x: 0, y: 64, z: 0 } },
    };
    const skill = new WanderSkill(bot);
    skill.do({});
    assert.equals(moveStub.callCount, 1);
    const opts = moveStub.firstCall.args[0];
    assert.equals(opts.posY, 64);
    assert.isTrue(Math.abs(opts.posX) <= 16);
    assert.isTrue(Math.abs(opts.posZ) <= 16);
  });
});
