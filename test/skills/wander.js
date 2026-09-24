"use strict";
import WanderSkill from "../../lib/skills/wander.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("WanderSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should move to a random nearby location", () => {
    const bot = {
      entity: { position: { x: 0, y: 64, z: 0 } },
    };
    const skill = new WanderSkill(bot);
    const opts = skill.do({});
    assert.equals(opts.posY, 64);
    assert.isTrue(Math.abs(opts.posX) <= 16);
    assert.isTrue(Math.abs(opts.posZ) <= 16);
  });
  it("should return class name as id", () => {
    const skill = new WanderSkill({});
    assert.equals(skill.getId(), "WanderSkill");
  });
});
