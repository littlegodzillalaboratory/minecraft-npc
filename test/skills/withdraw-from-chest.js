"use strict";
import WithdrawFromChestSkill from "../../lib/skills/withdraw-from-chest.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("WithdrawFromChestSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should withdraw only matching items when an item name is given", async () => {
    const container = {
      containerItems: () => [
        { name: "bread", type: 297, count: 5 },
        { name: "stone", type: 1, count: 2 },
      ],
      withdraw: sinon.stub().resolves(),
      close: sinon.spy(),
    };
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => ({ name: "chest" }),
      openContainer: sinon.stub().resolves(container),
      chat: sinon.spy(),
    };
    const skill = new WithdrawFromChestSkill(bot);
    await skill.do({ itemName: "bread" });
    assert.equals(container.withdraw.callCount, 1);
    assert.equals(container.withdraw.firstCall.args, [297, null, 5]);
  });

  it("should withdraw everything when no item name is given", async () => {
    const container = {
      containerItems: () => [
        { name: "bread", type: 297, count: 5 },
        { name: "stone", type: 1, count: 2 },
      ],
      withdraw: sinon.stub().resolves(),
      close: sinon.spy(),
    };
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => ({ name: "chest" }),
      openContainer: sinon.stub().resolves(container),
      chat: sinon.spy(),
    };
    const skill = new WithdrawFromChestSkill(bot);
    await skill.do({});
    assert.equals(container.withdraw.callCount, 2);
  });

  it("should say there is no chest nearby when none is found", async () => {
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => null,
      openContainer: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new WithdrawFromChestSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "There is no chest nearby");
    assert.equals(bot.openContainer.callCount, 0);
  });

  it("should say the chest has no matching items", async () => {
    const container = {
      containerItems: () => [],
      withdraw: sinon.stub().resolves(),
      close: sinon.spy(),
    };
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => ({ name: "chest" }),
      openContainer: sinon.stub().resolves(container),
      chat: sinon.spy(),
    };
    const skill = new WithdrawFromChestSkill(bot);
    await skill.do({ itemName: "bread" });
    assert.equals(bot.chat.firstCall.args[0], "The chest has no bread");
    assert.equals(container.withdraw.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new WithdrawFromChestSkill({});
    assert.equals(skill.getId(), "WithdrawFromChestSkill");
  });

});
