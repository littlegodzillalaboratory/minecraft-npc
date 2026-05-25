"use strict";
import BaseSkill from "../lib/skills/base.js";
import EmptyInventorySkill from "../lib/skills/empty-inventory.js";
import GuardLocationSkill from "../lib/skills/guard-location.js";
import MessageChatGptSkill from "../lib/skills/message-chatgpt.js";
import MoveBlocksDistanceToDirectionSkill from "../lib/skills/move-blocks-distance-to-direction.js";
import MoveToLocationSkill from "../lib/skills/move-to-location.js";
import MoveToObjectSkill from "../lib/skills/move-to-object.js";
import SayMessageSkill from "../lib/skills/say-message.js";
import StopSkill from "../lib/skills/stop.js";
import bag from "bagofcli";
import pathfinder from "mineflayer-pathfinder";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("skills", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should log default BaseSkill errors", () => {
    const errorStub = sinon.stub(bag, "logStepItemError");
    const skill = new BaseSkill({});
    skill.getId();
    skill.do({});
    assert.equals(errorStub.callCount, 2);
  });

  it("should run EmptyInventorySkill", async () => {
    const tossStack = sinon.spy();
    const bot = {
      inventory: {
        items: () => [{ name: "stone", count: 2 }],
      },
      tossStack,
    };
    const skill = new EmptyInventorySkill(bot);
    await skill.do({});
    assert.equals(tossStack.callCount, 1);
  });

  it("should run GuardLocationSkill and throw on missing registerInfo", () => {
    const bot = { guardLocation: sinon.stub().returns("success") };
    const skill = new GuardLocationSkill(bot);
    assert.exception(() => skill.do({ posX: 1, posY: 2, posZ: 3 }));
  });

  it("should run MessageChatGptSkill", async () => {
    const chat = sinon.spy();
    const bot = {
      chatgpt: { sendMessage: sinon.stub().resolves("reply") },
      chat,
    };
    const skill = new MessageChatGptSkill(bot);
    await skill.do({ username: "alice", message: "hello" });
    assert.equals(bot.chatgpt.sendMessage.callCount, 1);
    assert.equals(chat.firstCall.args[0], "reply");
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

  it("should find a matching object block", () => {
    const findBlock = sinon.stub().returns({ position: { x: 4, y: 5, z: 6 } });
    const moveToLocationDoStub = sinon.stub(
      MoveToLocationSkill.prototype,
      "do",
    );
    const skill = new MoveToObjectSkill({
      registry: {
        blocksByName: {
          red_bed: { id: 1, name: "red_bed" },
          stone: { id: 2, name: "stone" },
        },
      },
      chat: sinon.spy(),
      findBlock,
    });
    skill.do({ objectName: "bed" });
    assert.equals(findBlock.firstCall.args[0].matching[0], 1);
    assert.equals(moveToLocationDoStub.callCount, 1);
    assert.equals(moveToLocationDoStub.firstCall.args[0].posX, 4);
    assert.equals(moveToLocationDoStub.firstCall.args[0].posY, 5);
    assert.equals(moveToLocationDoStub.firstCall.args[0].posZ, 6);
  });

  it("should return undefined when object block is not discoverable", () => {
    const findBlock = sinon.stub();
    const chat = sinon.spy();
    const skill = new MoveToObjectSkill({
      registry: {
        blocksByName: {
          stone: { id: 2, name: "stone" },
        },
      },
      chat,
      findBlock,
    });
    assert.same(skill.do({ objectName: "bed" }), undefined);
    assert.equals(findBlock.callCount, 0);
    assert.equals(chat.firstCall.args[0], "I cannot find any bed");
  });

  it("should run SayMessageSkill", () => {
    const chat = sinon.spy();
    const skill = new SayMessageSkill({ chat });
    skill.do({ message: "hello" });
    assert.equals(chat.firstCall.args[0], "hello");
  });

  it("should run StopSkill with available bot controls", () => {
    const bot = {
      pathfinder: {
        stop: sinon.spy(),
        setGoal: sinon.spy(),
      },
      pvp: {
        stop: sinon.spy(),
      },
      clearControlStates: sinon.spy(),
    };
    const skill = new StopSkill(bot);
    skill.do({});
    assert.equals(bot.pathfinder.stop.callCount, 1);
    assert.equals(bot.pathfinder.setGoal.callCount, 1);
    assert.equals(bot.pvp.stop.callCount, 1);
    assert.equals(bot.clearControlStates.callCount, 1);
  });

  it("should run StopSkill when controls are unavailable", () => {
    const skill = new StopSkill({});
    skill.do({});
    assert.isTrue(true);
  });
});
