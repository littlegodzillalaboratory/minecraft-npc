"use strict";
import SleepSkill from "../../lib/skills/sleep.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SleepSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should sleep in a nearby bed when one is found", async () => {
    const bed = { position: { x: 1, y: 64, z: 1 } };
    const sleepStub = sinon.stub().resolves();
    const bot = {
      registry: {
        blocksByName: {
          red_bed: { id: 1, name: "red_bed" },
          white_bed: { id: 2, name: "white_bed" },
          stone: { id: 3, name: "stone" },
        },
      },
      findBlock: sinon.stub().returns(bed),
      sleep: sleepStub,
      chat: sinon.spy(),
    };
    const skill = new SleepSkill(bot);
    await skill.do({});
    assert.equals(bot.findBlock.firstCall.args[0].matching[0], 1);
    assert.equals(bot.findBlock.firstCall.args[0].matching[1], 2);
    assert.equals(bot.findBlock.firstCall.args[0].maxDistance, 32);
    assert.equals(sleepStub.callCount, 1);
    assert.same(sleepStub.firstCall.args[0], bed);
    assert.equals(bot.chat.callCount, 0);
  });

  it("should say there is no bed nearby when no bed is found", async () => {
    const bot = {
      registry: {
        blocksByName: {
          stone: { id: 3, name: "stone" },
        },
      },
      findBlock: sinon.stub().returns(null),
      sleep: sinon.stub(),
      chat: sinon.spy(),
    };
    const skill = new SleepSkill(bot);
    await skill.do({});
    assert.equals(bot.sleep.callCount, 0);
    assert.equals(bot.chat.firstCall.args[0], "There is no bed nearby.");
  });
});
