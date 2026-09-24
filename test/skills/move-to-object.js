"use strict";
import MoveToObjectSkill from "../../lib/skills/move-to-object.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MoveToObjectSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should find a matching object block", () => {
    const findBlock = sinon.stub().returns({ position: { x: 4, y: 5, z: 6 } });
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
    const position = skill.do({ objectName: "bed" });
    assert.equals(findBlock.firstCall.args[0].matching[0], 1);
    assert.equals(position, { posX: 4, posY: 5, posZ: 6 });
  });

  it("should report when object block is not discoverable", () => {
    const findBlock = sinon.stub().returns(null);
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
    skill.do({ objectName: "bed" });
    assert.equals(chat.firstCall.args[0], "I cannot find any bed nearby");
    assert.equals(findBlock.callCount, 1);
  });
  it("should return class name as id", () => {
    const skill = new MoveToObjectSkill({});
    assert.equals(skill.getId(), "MoveToObjectSkill");
  });
});
