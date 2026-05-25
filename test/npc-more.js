"use strict";
import pathfinder from "mineflayer-pathfinder";
import Npc from "../lib/npc.js";
import Register from "../lib/register.js";
import referee from "@sinonjs/referee";

const assert = referee.assert;

describe("Npc - more", () => {
  it("should return bot/register/opts references", () => {
    const bot = { entity: { position: { x: 1, y: 2, z: 3 } }, players: {} };
    const register = new Register();
    const opts = { a: 1 };
    const npc = new Npc(bot, register, opts);
    assert.same(npc.getBot(), bot);
    assert.same(npc.getRegister(), register);
    assert.same(npc.getOpts(), opts);
  });

  it("should return own and player position", () => {
    const bot = {
      entity: { position: { x: 1, y: 2, z: 3 } },
      players: { alice: { entity: { position: { x: 4, y: 5, z: 6 } } } },
    };
    const npc = new Npc(bot, new Register(), {});
    assert.equals(npc.getPosition().x, 1);
    assert.equals(npc.getPlayerPosition("alice").x, 4);
  });

  it("should execute emptyInventory", () => {
    const bot = { username: "bob", inventory: { items: () => [] }, tossStack: () => {} };
    const npc = new Npc(bot, new Register(), {});
    assert.equals(npc.emptyInventory(), "success");
  });

  it("should execute moveToLocation, messageChatGpt, sayMessage, and throw on guardLocation", async () => {
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

    const bot = {
      username: "bob",
      inventory: { items: () => [] },
      tossStack: () => {},
      pathfinder: { setMovements: () => {}, setGoal: () => {} },
      guardLocation: () => "ok",
      chatgpt: { sendMessage: async () => "ok" },
      chat: () => {},
    };
    try {
      const npc = new Npc(bot, new Register(), {});
      assert.equals(npc.moveToLocation(1, 2, 3), "success");
      assert.exception(() => npc.guardLocation(1, 2, 3));
      assert.equals(npc.sayMessage("hello"), "success");
      assert.equals(npc.messageChatGpt("alice", "hello"), "success");
    } finally {
      pathfinder.Movements = originalMovements;
      pathfinder.goals.GoalNear = originalGoalNear;
    }
  });

  it("should fail validation branch", () => {
    const bot = {
      username: "bob",
      pathfinder: { setMovements: () => {}, setGoal: () => {} },
      chat: () => {},
      chatgpt: { sendMessage: async () => "ok" },
    };
    const npc = new Npc(bot, new Register(), {});
    assert.equals(npc.moveToLocation("a", 2, 3), "failed");
    assert.equals(npc.sayMessage(""), "failed");
    assert.equals(npc.moveBlocksDistanceToDirection(0, "forward"), "failed");
  });
});
