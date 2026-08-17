"use strict";
import FaceDirectionSkill from "../../lib/skills/face-direction.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FaceDirectionSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should look toward the given cardinal direction", async () => {
    const bot = {
      entity: { yaw: 0 },
      look: sinon.stub().resolves(),
    };
    const skill = new FaceDirectionSkill(bot);
    await skill.do({ direction: "north" });
    assert.equals(bot.look.firstCall.args[0], Math.PI);
    assert.equals(bot.look.firstCall.args[1], 0);
  });

  it("should turn around by adding PI to current yaw", async () => {
    const bot = {
      entity: { yaw: 1 },
      look: sinon.stub().resolves(),
    };
    const skill = new FaceDirectionSkill(bot);
    await skill.do({ direction: "around" });
    assert.equals(bot.look.firstCall.args[0], 1 + Math.PI);
  });
});
