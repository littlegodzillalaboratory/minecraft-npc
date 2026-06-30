"use strict";
import MoveToLocationSkill from "../../lib/skills/move-to-location.js";
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
});
