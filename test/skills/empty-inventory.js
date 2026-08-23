"use strict";
import EmptyInventorySkill from "../../lib/skills/empty-inventory.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EmptyInventorySkill", () => {
  afterEach(() => {
    sinon.restore();
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
  it("should return class name as id", () => {
    const skill = new EmptyInventorySkill({});
    assert.equals(skill.getId(), "EmptyInventorySkill");
  });

});
