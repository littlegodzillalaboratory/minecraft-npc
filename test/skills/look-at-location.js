"use strict";
import LookAtLocationSkill from "../../lib/skills/look-at-location.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("LookAtLocationSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should look at the given location", async () => {
    const bot = {
      lookAt: sinon.stub().resolves(),
    };
    const skill = new LookAtLocationSkill(bot);
    await skill.do({ posX: 1, posY: 2, posZ: 3 });
    assert.equals(bot.lookAt.callCount, 1);
    assert.equals(bot.lookAt.firstCall.args[0].x, 1);
    assert.equals(bot.lookAt.firstCall.args[0].y, 2);
    assert.equals(bot.lookAt.firstCall.args[0].z, 3);
  });
  it("should return class name as id", () => {
    const skill = new LookAtLocationSkill({});
    assert.equals(skill.getId(), "LookAtLocationSkill");
  });

});
