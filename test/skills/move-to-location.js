"use strict";
import MoveToLocationSkill from "../../lib/skills/move-to-location.js";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MoveToLocationSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MoveToLocationSkill", () => {
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
        pathfinder: {
          setMovements: sinon.spy(),
          setGoal: sinon.spy(),
        },
      };
      const skill = new MoveToLocationSkill(bot);
      skill.do({ posX: 1, posY: 2, posZ: 3 });
      assert.equals(bot.pathfinder.setMovements.callCount, 1);
      assert.equals(bot.pathfinder.setGoal.callCount, 1);
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalNear = originalGoalNear;
    }
  });
  it("should return class name as id", () => {
    const skill = new MoveToLocationSkill({});
    assert.equals(skill.getId(), "MoveToLocationSkill");
  });

});
