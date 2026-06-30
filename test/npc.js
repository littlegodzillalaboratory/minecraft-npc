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

  describe("getBot / getRegister / getOpts", () => {
    it("should return bot/register/opts references", () => {
      const bot = { entity: { position: { x: 1, y: 2, z: 3 } }, players: {} };
      const register = new Register();
      const opts = { a: 1 };
      const npc = new Npc(bot, register, opts);
      assert.same(npc.getBot(), bot);
      assert.same(npc.getRegister(), register);
      assert.same(npc.getOpts(), opts);
    });
  });

  describe("getPosition / getPlayerPosition", () => {
    it("should return own and player position", () => {
      const bot = {
        entity: { position: { x: 1, y: 2, z: 3 } },
        players: { alice: { entity: { position: { x: 4, y: 5, z: 6 } } } },
      };
      const npc = new Npc(bot, new Register(), {});
      assert.equals(npc.getPosition().x, 1);
      assert.equals(npc.getPlayerPosition("alice").x, 4);
    });
  });

  describe("emptyInventory", () => {
    it("should execute emptyInventory", () => {
      const bot = {
        username: "bob",
        inventory: { items: () => [] },
        tossStack: () => {},
      };
      const npc = new Npc(bot, new Register(), {});
      assert.equals(npc.emptyInventory(), "success");
    });
  });

  describe("moveToLocation / guardLocation / messageChatGpt / sayMessage", () => {
    it("should execute moveToLocation, guardLocation, messageChatGpt, and sayMessage", async () => {
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
        registry: { entitiesByName: { zombie: { category: "Hostile mobs" } } },
        entities: {
          1: { type: "mob", name: "zombie", position: { x: 5, y: 64, z: 5 } },
        },
        pvp: { attack: sinon.spy() },
        chatgpt: { sendMessage: async () => "ok" },
        chat: () => {},
      };
      try {
        const npc = new Npc(bot, new Register(), {});
        assert.equals(npc.moveToLocation(1, 2, 3), "success");
        assert.equals(npc.guardLocation(1, 2, 3), "success");
        assert.equals(npc.sayMessage("hello"), "success");
        assert.equals(npc.messageChatGpt("alice", "hello"), "success");
      } finally {
        pathfinder.Movements = originalMovements;
        pathfinder.goals.GoalNear = originalGoalNear;
      }
    });
  });

  describe("validation", () => {
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

  describe("moveToObject", () => {
    it("should move to a discoverable object or say when it cannot be found", () => {
      const bot = {
        username: "bob",
        entity: { position: { x: 0, y: 0, z: 0 } },
        registry: {
          blocksByName: {
            red_bed: { id: 1, name: "red_bed" },
          },
        },
        findBlock: sinon.stub(),
        pathfinder: { setMovements: sinon.spy(), setGoal: sinon.spy() },
        chat: sinon.spy(),
      };

      const originalMovements = pathfinder.Movements;
      const originalGoalNear = pathfinder.goals.GoalNear;
      try {
        pathfinder.Movements = class {
          constructor(botRef) {
            this.bot = botRef;
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

        bot.findBlock.onFirstCall().returns({ position: { x: 8, y: 9, z: 10 } });
        bot.findBlock.onSecondCall().returns(undefined);

        const npc = new Npc(bot, new Register(), {});
        assert.equals(npc.moveToObject("bed"), "success");
        assert.equals(bot.pathfinder.setGoal.callCount, 1);
        assert.equals(npc.moveToObject("bedroom"), "success");
        assert.equals(bot.chat.firstCall.args[0], "I cannot find any bedroom");
      } finally {
        pathfinder.Movements = originalMovements;
        pathfinder.goals.GoalNear = originalGoalNear;
      }
    });
  });
});
