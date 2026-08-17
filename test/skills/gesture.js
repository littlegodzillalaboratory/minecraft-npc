"use strict";
import GestureSkill from "../../lib/skills/gesture.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("GestureSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should nod by pitching the head up and down", async () => {
    const bot = {
      entity: { yaw: 0 },
      look: sinon.stub().resolves(),
    };
    const skill = new GestureSkill(bot);
    await skill.do({ gestureName: "nod" });
    assert.equals(bot.look.callCount, 3);
    assert.equals(bot.look.getCall(0).args, [0, 0.6]);
    assert.equals(bot.look.getCall(1).args, [0, -0.4]);
    assert.equals(bot.look.getCall(2).args, [0, 0]);
  });

  it("should shake head by yawing left and right", async () => {
    const bot = {
      entity: { yaw: 0 },
      look: sinon.stub().resolves(),
    };
    const skill = new GestureSkill(bot);
    await skill.do({ gestureName: "shake" });
    assert.equals(bot.look.callCount, 3);
    assert.equals(bot.look.getCall(0).args, [0.6, 0]);
    assert.equals(bot.look.getCall(1).args, [-0.6, 0]);
    assert.equals(bot.look.getCall(2).args, [0, 0]);
  });
});
