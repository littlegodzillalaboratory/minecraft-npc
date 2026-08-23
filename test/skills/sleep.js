"use strict";
import SleepSkill from "../../lib/skills/sleep.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SleepSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should sleep in a nearby bed when one is found at night", async () => {
    const bed = { position: { x: 1, y: 64, z: 1 } };
    const sleepStub = sinon.stub().resolves();
    const bot = {
      time: { timeOfDay: 13000 },
      thunderState: 0,
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

  it("should sleep in a nearby bed when one is found during a thunderstorm", async () => {
    const bed = { position: { x: 1, y: 64, z: 1 } };
    const sleepStub = sinon.stub().resolves();
    const bot = {
      time: { timeOfDay: 6000 },
      thunderState: 1,
      registry: {
        blocksByName: {
          red_bed: { id: 1, name: "red_bed" },
        },
      },
      findBlock: sinon.stub().returns(bed),
      sleep: sleepStub,
      chat: sinon.spy(),
    };
    const skill = new SleepSkill(bot);
    await skill.do({});
    assert.equals(sleepStub.callCount, 1);
    assert.equals(bot.chat.callCount, 0);
  });

  it("should propagate mineflayer's own error when it is not the right time to sleep", async () => {
    const bed = { position: { x: 1, y: 64, z: 1 } };
    // mirrors what the real bot.sleep() throws when it's daytime and
    // there's no thunderstorm, per mineflayer/lib/plugins/bed.js
    const sleepStub = sinon
      .stub()
      .rejects(new Error("it's not night and it's not a thunderstorm"));
    const bot = {
      time: { timeOfDay: 6000 },
      thunderState: 0,
      registry: { blocksByName: { red_bed: { id: 1, name: "red_bed" } } },
      findBlock: sinon.stub().returns(bed),
      sleep: sleepStub,
      chat: sinon.spy(),
    };
    const skill = new SleepSkill(bot);
    let thrownError;
    try {
      await skill.do({});
    } catch (err) {
      thrownError = err;
    }
    assert.equals(
      thrownError.message,
      "it's not night and it's not a thunderstorm",
    );
  });

  it("should propagate mineflayer's own error when no bed is found nearby", async () => {
    // mirrors what the real bot.sleep() throws when handed a null bed
    // block: isABed(bedBlock) reads bedBlock.name, per
    // mineflayer/lib/plugins/bed.js
    const sleepStub = sinon
      .stub()
      .rejects(
        new TypeError("Cannot read properties of null (reading 'name')"),
      );
    const bot = {
      time: { timeOfDay: 13000 },
      thunderState: 0,
      registry: {
        blocksByName: {
          stone: { id: 3, name: "stone" },
        },
      },
      findBlock: sinon.stub().returns(null),
      sleep: sleepStub,
      chat: sinon.spy(),
    };
    const skill = new SleepSkill(bot);
    let thrownError;
    try {
      await skill.do({});
    } catch (err) {
      thrownError = err;
    }
    assert.equals(sleepStub.firstCall.args[0], null);
    assert.equals(
      thrownError.message,
      "Cannot read properties of null (reading 'name')",
    );
  });
  it("should return class name as id", () => {
    const skill = new SleepSkill({});
    assert.equals(skill.getId(), "SleepSkill");
  });

});
