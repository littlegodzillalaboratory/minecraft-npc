"use strict";
import DepositToChestSkill from "../../lib/skills/deposit-to-chest.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DepositToChestSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should deposit every inventory item into the chest", async () => {
    const container = {
      deposit: sinon.stub().resolves(),
      close: sinon.spy(),
    };
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => ({ name: "chest" }),
      inventory: {
        items: () => [
          { name: "stone", type: 1, count: 2 },
          { name: "bread", type: 297, count: 5 },
        ],
      },
      openContainer: sinon.stub().resolves(container),
      chat: sinon.spy(),
    };
    const skill = new DepositToChestSkill(bot);
    await skill.do({});
    assert.equals(container.deposit.callCount, 2);
    assert.equals(container.deposit.firstCall.args, [1, null, 2]);
    assert.equals(
      bot.chat.firstCall.args[0],
      "I have deposited my items into the chest",
    );
  });

  it("should say no chest when none is nearby", async () => {
    const bot = {
      registry: { blocksByName: { chest: { id: 54 } } },
      findBlock: () => null,
      chat: sinon.spy(),
    };
    const skill = new DepositToChestSkill(bot);
    await skill.do({});
    assert.equals(bot.chat.firstCall.args[0], "There is no chest nearby");
  });
  it("should return class name as id", () => {
    const skill = new DepositToChestSkill({});
    assert.equals(skill.getId(), "DepositToChestSkill");
  });

});
