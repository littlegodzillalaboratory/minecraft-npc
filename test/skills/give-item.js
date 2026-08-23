"use strict";
import GiveItemSkill from "../../lib/skills/give-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("GiveItemSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should look at the player and toss the item", async () => {
    const lookTarget = { x: 0, y: 1.6, z: 0 };
    const bot = {
      players: {
        alice: {
          entity: { position: { offset: () => lookTarget } },
        },
      },
      inventory: { items: () => [{ name: "apple", type: 10, count: 2 }] },
      lookAt: sinon.stub().resolves(),
      toss: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new GiveItemSkill(bot);
    await skill.do({ player: "alice", itemName: "apple" });
    assert.same(bot.lookAt.firstCall.args[0], lookTarget);
    assert.equals(bot.toss.firstCall.args, [10, null, 2]);
  });

  it("should say cannot see player when player entity is missing", async () => {
    const bot = {
      players: {},
      inventory: { items: () => [] },
      lookAt: sinon.stub().resolves(),
      toss: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new GiveItemSkill(bot);
    await skill.do({ player: "alice", itemName: "apple" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot see you, alice");
    assert.equals(bot.toss.callCount, 0);
  });

  it("should say does not have item when no item matches", async () => {
    const bot = {
      players: { alice: { entity: { position: { offset: () => ({}) } } } },
      inventory: { items: () => [] },
      lookAt: sinon.stub().resolves(),
      toss: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new GiveItemSkill(bot);
    await skill.do({ player: "alice", itemName: "apple" });
    assert.equals(bot.chat.firstCall.args[0], "I do not have any apple");
    assert.equals(bot.toss.callCount, 0);
  });
  it("should match items by their singular name", async () => {
    const bot = {
      players: { alice: { entity: { position: { offset: () => ({}) } } } },
      inventory: { items: () => [{ name: "apple", type: 10, count: 1 }] },
      lookAt: sinon.stub().resolves(),
      toss: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new GiveItemSkill(bot);
    await skill.do({ player: "alice", itemName: "apples" });
    assert.equals(bot.toss.firstCall.args, [10, null, 1]);
  });

  it("should return class name as id", () => {
    const skill = new GiveItemSkill({});
    assert.equals(skill.getId(), "GiveItemSkill");
  });

});
