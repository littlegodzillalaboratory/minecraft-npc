"use strict";
import FollowPlayerSkill from "../../lib/skills/follow-player.js";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FollowPlayerSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should follow player entity when player is visible", () => {
    const originalMovements = pathfinder.Movements;
    const originalGoalFollow = pathfinder.goals.GoalFollow;
    try {
      pathfinder.Movements = class {
        constructor(bot) {
          this.bot = bot;
        }
      };
      pathfinder.goals.GoalFollow = class {
        constructor(entity, range) {
          this.entity = entity;
          this.range = range;
        }
      };
      const bot = {
        players: { alice: { entity: { position: {} } } },
        pathfinder: {
          setMovements: sinon.spy(),
          setGoal: sinon.spy(),
        },
        chat: sinon.spy(),
      };
      const skill = new FollowPlayerSkill(bot);
      skill.do({ player: "alice" });
      assert.equals(bot.pathfinder.setMovements.callCount, 1);
      assert.equals(bot.pathfinder.setGoal.callCount, 1);
      assert.equals(bot.pathfinder.setGoal.firstCall.args[1], true);
      assert.equals(bot.chat.callCount, 0);
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalFollow = originalGoalFollow;
    }
  });

  it("should say cannot see player when player entity is missing", () => {
    const bot = {
      players: {},
      pathfinder: {
        setMovements: sinon.spy(),
        setGoal: sinon.spy(),
      },
      chat: sinon.spy(),
    };
    const skill = new FollowPlayerSkill(bot);
    skill.do({ player: "alice" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot see you, alice");
    assert.equals(bot.pathfinder.setGoal.callCount, 0);
  });
});
