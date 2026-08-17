"use strict";
import HarvestCropsSkill from "../../lib/skills/harvest-crops.js";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("HarvestCropsSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should walk to and dig a mature crop", async () => {
    const originalMovements = pathfinder.Movements;
    const originalGoalNear = pathfinder.goals.GoalNear;
    try {
      pathfinder.Movements = class {};
      pathfinder.goals.GoalNear = class {};
      const block = {
        name: "wheat",
        metadata: 7,
        position: { x: 1, y: 2, z: 3 },
      };
      const bot = {
        registry: { blocksByName: { wheat: { id: 59, name: "wheat" } } },
        findBlock: (opts) => (opts.useExtraInfo(block) ? block : null),
        pathfinder: {
          setMovements: sinon.spy(),
          goto: sinon.stub().resolves(),
        },
        dig: sinon.stub().resolves(),
        chat: sinon.spy(),
      };
      const skill = new HarvestCropsSkill(bot);
      await skill.do({});
      assert.same(bot.dig.firstCall.args[0], block);
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalNear = originalGoalNear;
    }
  });

  it("should say no crops ready when none are found", async () => {
    const bot = {
      registry: { blocksByName: { wheat: { id: 59, name: "wheat" } } },
      findBlock: () => null,
      dig: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new HarvestCropsSkill(bot);
    await skill.do({});
    assert.equals(
      bot.chat.firstCall.args[0],
      "There are no crops ready to harvest nearby",
    );
    assert.equals(bot.dig.callCount, 0);
  });
});
