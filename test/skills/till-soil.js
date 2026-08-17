"use strict";
import TillSoilSkill from "../../lib/skills/till-soil.js";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("TillSoilSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should walk to tillable ground, equip hoe, and activate the block", async () => {
    const originalMovements = pathfinder.Movements;
    const originalGoalNear = pathfinder.goals.GoalNear;
    try {
      pathfinder.Movements = class {};
      pathfinder.goals.GoalNear = class {};
      const hoe = { name: "iron_hoe" };
      const ground = {
        name: "grass_block",
        position: { x: 1, y: 2, z: 3, offset: () => ({}) },
      };
      const bot = {
        inventory: { items: () => [hoe] },
        registry: { blocksByName: { grass_block: { id: 2 }, dirt: { id: 3 } } },
        findBlock: () => ground,
        blockAt: () => ({ name: "air" }),
        pathfinder: {
          setMovements: sinon.spy(),
          goto: sinon.stub().resolves(),
        },
        equip: sinon.stub().resolves(),
        activateBlock: sinon.stub().resolves(),
        chat: sinon.spy(),
      };
      const skill = new TillSoilSkill(bot);
      await skill.do({});
      assert.same(bot.equip.firstCall.args[0], hoe);
      assert.same(bot.activateBlock.firstCall.args[0], ground);
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalNear = originalGoalNear;
    }
  });

  it("should say no hoe when inventory has none", async () => {
    const bot = {
      inventory: { items: () => [] },
      chat: sinon.spy(),
    };
    const skill = new TillSoilSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "I have no hoe to till with");
  });

  it("should say no ground to till when none is found", async () => {
    const bot = {
      inventory: { items: () => [{ name: "iron_hoe" }] },
      registry: { blocksByName: { grass_block: { id: 2 }, dirt: { id: 3 } } },
      findBlock: () => null,
      chat: sinon.spy(),
    };
    const skill = new TillSoilSkill(bot);
    await skill.do({});
    assert.equals(
      bot.chat.firstCall.args[0],
      "There is no ground to till nearby",
    );
  });
});
