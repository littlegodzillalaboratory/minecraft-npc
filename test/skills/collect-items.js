"use strict";
import CollectItemsSkill from "../../lib/skills/collect-items.js";
import MoveToLocationSkill from "../../lib/skills/move-to-location.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CollectItemsSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should move to the nearest dropped item", () => {
    const moveStub = sinon.stub(MoveToLocationSkill.prototype, "do");
    const itemEntity = { name: "item", position: { x: 1, y: 2, z: 3 } };
    const bot = {
      nearestEntity: (predicate) => (predicate(itemEntity) ? itemEntity : null),
      chat: sinon.spy(),
    };
    const skill = new CollectItemsSkill(bot);
    skill.do({});
    assert.equals(moveStub.firstCall.args[0], { posX: 1, posY: 2, posZ: 3 });
  });

  it("should say no items nearby when none exist", () => {
    const moveStub = sinon.stub(MoveToLocationSkill.prototype, "do");
    const bot = {
      nearestEntity: () => null,
      chat: sinon.spy(),
    };
    const skill = new CollectItemsSkill(bot);
    skill.do({});
    assert.equals(
      bot.chat.firstCall.args[0],
      "There are no items to pick up nearby",
    );
    assert.equals(moveStub.callCount, 0);
  });
});
