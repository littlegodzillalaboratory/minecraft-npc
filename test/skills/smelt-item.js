"use strict";
import SmeltItemSkill from "../../lib/skills/smelt-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SmeltItemSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should open the furnace and load fuel and input", async () => {
    const furnace = {
      putFuel: sinon.stub().resolves(),
      putInput: sinon.stub().resolves(),
      close: sinon.spy(),
    };
    const bot = {
      registry: { blocksByName: { furnace: { id: 61 } } },
      findBlock: () => ({ name: "furnace" }),
      inventory: {
        items: () => [
          { name: "iron_ore", type: 15, count: 4 },
          { name: "coal", type: 263, count: 8 },
        ],
      },
      openFurnace: sinon.stub().resolves(furnace),
      chat: sinon.spy(),
    };
    const skill = new SmeltItemSkill(bot);
    await skill.do({ itemName: "iron ore" });
    assert.equals(furnace.putFuel.firstCall.args, [263, null, 8]);
    assert.equals(furnace.putInput.firstCall.args, [15, null, 4]);
    assert.equals(furnace.close.callCount, 1);
  });

  it("should say no furnace when none is nearby", async () => {
    const bot = {
      registry: { blocksByName: { furnace: { id: 61 } } },
      findBlock: () => null,
      chat: sinon.spy(),
    };
    const skill = new SmeltItemSkill(bot);
    await skill.do({ itemName: "iron ore" });
    assert.equals(bot.chat.firstCall.args[0], "There is no furnace nearby");
  });

  it("should say no fuel when inventory has no fuel", async () => {
    const bot = {
      registry: { blocksByName: { furnace: { id: 61 } } },
      findBlock: () => ({ name: "furnace" }),
      inventory: { items: () => [{ name: "iron_ore", type: 15, count: 4 }] },
      chat: sinon.spy(),
    };
    const skill = new SmeltItemSkill(bot);
    await skill.do({ itemName: "iron ore" });
    assert.equals(bot.chat.firstCall.args[0], "I have no fuel to smelt with");
  });
});
