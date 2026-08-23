"use strict";
import ListChestSkill from "../../lib/skills/list-chest.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ListChestSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should say the chest contents", async () => {
    const container = {
      containerItems: () => [{ name: "bread", count: 3 }],
      close: sinon.spy(),
    };
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => ({ name: "chest" }),
      openContainer: sinon.stub().resolves(container),
      chat: sinon.spy(),
    };
    const skill = new ListChestSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "The chest contains: bread x 3");
    assert.equals(container.close.callCount, 1);
  });

  it("should say the chest is empty when it has no items", async () => {
    const container = {
      containerItems: () => [],
      close: sinon.spy(),
    };
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => ({ name: "chest" }),
      openContainer: sinon.stub().resolves(container),
      chat: sinon.spy(),
    };
    const skill = new ListChestSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "The chest is empty");
  });

  it("should say no chest when none is nearby", async () => {
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => null,
      chat: sinon.spy(),
    };
    const skill = new ListChestSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "There is no chest nearby");
  });
  it("should return class name as id", () => {
    const skill = new ListChestSkill({});
    assert.equals(skill.getId(), "ListChestSkill");
  });

});
