"use strict";
import MoveBlocksDistanceToDirectionSkill from "../../lib/skills/move-blocks-distance-to-direction.js";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MoveBlocksDistanceToDirectionSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MoveBlocksDistanceToDirectionSkill do", () => {
    const originalMovements = pathfinder.Movements;
    const originalGoalNear = pathfinder.goals.GoalNear;
    try {
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
      const bot = {
        entity: {
          yaw: 0,
          position: {
            offset: (x, y, z) => ({ x: 10 + x, y: 20 + y, z: 30 + z }),
          },
        },
        pathfinder: {
          setMovements: sinon.spy(),
          setGoal: sinon.spy(),
        },
      };
      const skill = new MoveBlocksDistanceToDirectionSkill(bot);
      skill.do({ distance: 2, direction: "forward" });
      assert.equals(bot.pathfinder.setMovements.callCount, 1);
      assert.equals(bot.pathfinder.setGoal.callCount, 1);
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalNear = originalGoalNear;
    }
  });

  it("should cover MoveBlocksDistanceToDirectionSkill all direction branches", () => {
    const bot = {
      entity: { yaw: 0 },
    };
    const skill = new MoveBlocksDistanceToDirectionSkill(bot);
    const position = {
      offset: (x, y, z) => ({ x, y, z }),
    };

    const dirs = [
      "forward",
      "backward",
      "leftward",
      "rightward",
      "downward",
      "upward",
    ];

    for (const direction of dirs) {
      const result = skill._getTargetPosition(position, 3, direction);
      assert.isObject(result);
    }
  });
  it("should return class name as id", () => {
    const skill = new MoveBlocksDistanceToDirectionSkill({});
    assert.equals(skill.getId(), "MoveBlocksDistanceToDirectionSkill");
  });

});
