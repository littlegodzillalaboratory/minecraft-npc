"use strict";
import CraftItemSkill from "../../lib/skills/craft-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CraftItemSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should craft the item using a nearby crafting table", async () => {
    const recipe = { id: "somerecipe" };
    const craftingTable = { name: "crafting_table" };
    const bot = {
      registry: {
        itemsByName: { stick: { id: 280 } },
        blocksByName: { crafting_table: { id: 58 } },
      },
      findBlock: () => craftingTable,
      recipesFor: sinon.stub().returns([recipe]),
      craft: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new CraftItemSkill(bot);
    await skill.do({ itemName: "sticks" });
    assert.same(bot.craft.firstCall.args[0], recipe);
    assert.equals(bot.craft.firstCall.args[1], 1);
    assert.same(bot.craft.firstCall.args[2], craftingTable);
    assert.equals(bot.chat.firstCall.args[0], "I crafted sticks");
  });

  it("should say does not know how to craft unknown item", async () => {
    const bot = {
      registry: { itemsByName: {}, blocksByName: {} },
      craft: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new CraftItemSkill(bot);
    await skill.do({ itemName: "gizmo" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "I do not know how to craft gizmo",
    );
    assert.equals(bot.craft.callCount, 0);
  });

  it("should say cannot craft when there is no recipe available", async () => {
    const bot = {
      registry: {
        itemsByName: { stick: { id: 280 } },
        blocksByName: {},
      },
      recipesFor: sinon.stub().returns([]),
      craft: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new CraftItemSkill(bot);
    await skill.do({ itemName: "stick" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot craft stick right now");
    assert.equals(bot.craft.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new CraftItemSkill({});
    assert.equals(skill.getId(), "CraftItemSkill");
  });

});
