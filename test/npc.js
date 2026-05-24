"use strict";
import pathfinder from "mineflayer-pathfinder";
import Npc from "../lib/npc.js";
import Register from "../lib/register.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";
const assert = referee.assert;

describe("Npc", () => {
  describe("stop", () => {
    it("should stop bot movement, combat, and controls", () => {
      const mockBot = {
        username: "bob",
        pathfinder: {
          stop: sinon.spy(),
          setGoal: sinon.spy(),
        },
        pvp: {
          stop: sinon.spy(),
        },
        clearControlStates: sinon.spy(),
      };
      const npc = new Npc(mockBot, new Register(), {});

      const status = npc.stop();

      assert.equals(status, "success");
      assert.equals(mockBot.pathfinder.stop.callCount, 1);
      assert.equals(mockBot.pathfinder.setGoal.callCount, 1);
      assert.equals(mockBot.pathfinder.setGoal.firstCall.args[0], null);
      assert.equals(mockBot.pvp.stop.callCount, 1);
      assert.equals(mockBot.clearControlStates.callCount, 1);
    });
  });

  describe("moveBlocksDistanceToDirection", () => {
    it("should move the bot the requested number of blocks in a direction", () => {
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
        const mockBot = {
          username: "bob",
          entity: {
            position: {
              x: 10,
              y: 64,
              z: 10,
              offset: (x, y, z) => ({ x: 10 + x, y: 64 + y, z: 10 + z }),
            },
            yaw: 0,
          },
          pathfinder: {
            setMovements: sinon.spy(),
            setGoal: sinon.spy(),
          },
        };
        const npc = new Npc(mockBot, new Register(), {});

        const status = npc.moveBlocksDistanceToDirection(5, "forward");

        assert.equals(status, "success");
        assert.equals(mockBot.pathfinder.setMovements.callCount, 1);
        assert.equals(mockBot.pathfinder.setGoal.callCount, 1);
        assert.equals(mockBot.pathfinder.setGoal.firstCall.args[0].x, 10);
        assert.equals(mockBot.pathfinder.setGoal.firstCall.args[0].y, 64);
        assert.equals(mockBot.pathfinder.setGoal.firstCall.args[0].z, 15);
      } finally {
        pathfinder.Movements = originalMovements;
        pathfinder.goals.GoalNear = originalGoalNear;
      }
    });
  });
});
