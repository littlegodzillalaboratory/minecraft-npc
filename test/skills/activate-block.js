"use strict";
import ActivateBlockSkill from "../../lib/skills/activate-block.js";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ActivateBlockSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should walk to and activate the matching block", async () => {
    const originalMovements = pathfinder.Movements;
    const originalGoalNear = pathfinder.goals.GoalNear;
    try {
      pathfinder.Movements = class {};
      pathfinder.goals.GoalNear = class {};
      const lever = { name: "lever", position: { x: 1, y: 2, z: 3 } };
      const bot = {
        registry: { blocksByName: { lever: { id: 69, name: "lever" } } },
        findBlock: () => lever,
        pathfinder: {
          setMovements: sinon.spy(),
          goto: sinon.stub().resolves(),
        },
        activateBlock: sinon.stub().resolves(),
        chat: sinon.spy(),
      };
      const skill = new ActivateBlockSkill(bot);
      await skill.do({ blockName: "lever" });
      assert.same(bot.activateBlock.firstCall.args[0], lever);
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalNear = originalGoalNear;
    }
  });

  it("should say cannot find block when none is nearby", async () => {
    const bot = {
      registry: { blocksByName: { lever: { id: 69, name: "lever" } } },
      findBlock: () => null,
      activateBlock: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new ActivateBlockSkill(bot);
    await skill.do({ blockName: "lever" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot find any lever nearby");
    assert.equals(bot.activateBlock.callCount, 0);
  });

  it("should say does not know block when name matches nothing", async () => {
    const bot = {
      registry: { blocksByName: {} },
      chat: sinon.spy(),
    };
    const skill = new ActivateBlockSkill(bot);
    await skill.do({ blockName: "gizmo" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "I do not know any block like gizmo",
    );
  });
});
