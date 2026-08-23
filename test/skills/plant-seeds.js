"use strict";
import PlantSeedsSkill from "../../lib/skills/plant-seeds.js";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("PlantSeedsSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should walk to farmland, equip seeds, and place them", async () => {
    const originalMovements = pathfinder.Movements;
    const originalGoalNear = pathfinder.goals.GoalNear;
    try {
      pathfinder.Movements = class {};
      pathfinder.goals.GoalNear = class {};
      const seeds = { name: "wheat_seeds" };
      const farmland = {
        name: "farmland",
        position: { x: 1, y: 2, z: 3, offset: () => ({}) },
      };
      const bot = {
        inventory: { items: () => [seeds] },
        registry: { blocksByName: { farmland: { id: 60 } } },
        findBlock: () => farmland,
        blockAt: () => ({ name: "air" }),
        pathfinder: {
          setMovements: sinon.spy(),
          goto: sinon.stub().resolves(),
        },
        equip: sinon.stub().resolves(),
        placeBlock: sinon.stub().resolves(),
        chat: sinon.spy(),
      };
      const skill = new PlantSeedsSkill(bot);
      await skill.do({});
      assert.same(bot.equip.firstCall.args[0], seeds);
      assert.same(bot.placeBlock.firstCall.args[0], farmland);
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalNear = originalGoalNear;
    }
  });

  it("should say no seeds when inventory has none", async () => {
    const bot = {
      inventory: { items: () => [] },
      chat: sinon.spy(),
      placeBlock: sinon.stub().resolves(),
    };
    const skill = new PlantSeedsSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "I have no seeds to plant");
  });

  it("should say it does not know farmland when the block is unregistered", async () => {
    const bot = {
      inventory: { items: () => [{ name: "wheat_seeds" }] },
      registry: { blocksByName: {} },
      chat: sinon.spy(),
      placeBlock: sinon.stub().resolves(),
    };
    const skill = new PlantSeedsSkill(bot);
    await skill.do({});
    assert.equals(
      bot.chat.firstCall.args[0],
      "I do not know what farmland is in this world",
    );
  });

  it("should evaluate candidate blocks using the block above them", async () => {
    const originalMovements = pathfinder.Movements;
    const originalGoalNear = pathfinder.goals.GoalNear;
    try {
      pathfinder.Movements = class {};
      pathfinder.goals.GoalNear = class {};
      const seeds = { name: "wheat_seeds" };
      const farmland = {
        name: "farmland",
        position: { x: 1, y: 2, z: 3, offset: () => ({}) },
      };
      const candidate = { position: { offset: () => ({}) } };
      const blockAt = sinon.stub();
      blockAt.onCall(0).returns(null);
      blockAt.onCall(1).returns({ name: "dirt" });
      blockAt.onCall(2).returns({ name: "air" });
      const bot = {
        inventory: { items: () => [seeds] },
        registry: { blocksByName: { farmland: { id: 60 } } },
        findBlock: (findOpts) => {
          findOpts.useExtraInfo(candidate);
          findOpts.useExtraInfo(candidate);
          return findOpts.useExtraInfo(candidate) ? farmland : null;
        },
        blockAt,
        pathfinder: {
          setMovements: sinon.spy(),
          goto: sinon.stub().resolves(),
        },
        equip: sinon.stub().resolves(),
        placeBlock: sinon.stub().resolves(),
        chat: sinon.spy(),
      };
      const skill = new PlantSeedsSkill(bot);
      await skill.do({});
      assert.same(bot.placeBlock.firstCall.args[0], farmland);
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalNear = originalGoalNear;
    }
  });

  it("should say no farmland when none is found", async () => {
    const bot = {
      inventory: { items: () => [{ name: "wheat_seeds" }] },
      registry: { blocksByName: { farmland: { id: 60 } } },
      findBlock: () => null,
      chat: sinon.spy(),
      placeBlock: sinon.stub().resolves(),
    };
    const skill = new PlantSeedsSkill(bot);
    await skill.do({});
    assert.equals(
      bot.chat.firstCall.args[0],
      "There is no empty farmland nearby",
    );
  });
  it("should return class name as id", () => {
    const skill = new PlantSeedsSkill({});
    assert.equals(skill.getId(), "PlantSeedsSkill");
  });

});
