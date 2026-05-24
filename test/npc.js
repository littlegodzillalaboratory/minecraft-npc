"use strict";
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
});
