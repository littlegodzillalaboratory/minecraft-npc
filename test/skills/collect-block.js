"use strict";
import CollectBlockSkill from "../../lib/skills/collect-block.js";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

function stubPathfinder() {
  const originalMovements = pathfinder.Movements;
  const originalGoalNear = pathfinder.goals.GoalNear;
  pathfinder.Movements = class {
    constructor(bot) {
      this.bot = bot;
    }
  };
  pathfinder.goals.GoalNear = class {
    constructor(x, y, z, range) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.range = range;
    }
  };
  return () => {
    pathfinder.Movements = originalMovements;
    pathfinder.goals.GoalNear = originalGoalNear;
  };
}

describe("CollectBlockSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should walk to and dig the matching block", async () => {
    const restore = stubPathfinder();
    try {
      const block = { name: "coal_ore", position: { x: 1, y: 2, z: 3 } };
      const bot = {
        registry: { blocksByName: { coal_ore: { id: 7, name: "coal_ore" } } },
        findBlock: () => block,
        pathfinder: {
          setMovements: sinon.spy(),
          goto: sinon.stub().resolves(),
        },
        canDigBlock: () => true,
        dig: sinon.stub().resolves(),
        chat: sinon.spy(),
      };
      const skill = new CollectBlockSkill(bot);
      await skill.do({ blockName: "coal" });
      assert.equals(bot.pathfinder.goto.callCount, 1);
      assert.same(bot.dig.firstCall.args[0], block);
    } finally {
      restore();
    }
  });

  it("should say cannot find block when none is nearby", async () => {
    const bot = {
      registry: { blocksByName: { coal_ore: { id: 7, name: "coal_ore" } } },
      findBlock: () => null,
      chat: sinon.spy(),
      dig: sinon.stub().resolves(),
    };
    const skill = new CollectBlockSkill(bot);
    await skill.do({ blockName: "coal" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot find any coal nearby");
    assert.equals(bot.dig.callCount, 0);
  });

  it("should say does not know block when name matches nothing", async () => {
    const bot = {
      registry: { blocksByName: {} },
      chat: sinon.spy(),
      dig: sinon.stub().resolves(),
    };
    const skill = new CollectBlockSkill(bot);
    await skill.do({ blockName: "unobtainium" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "I do not know any block like unobtainium",
    );
  });
});
