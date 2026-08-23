"use strict";
import DigBlockSkill from "../../lib/skills/dig-block.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DigBlockSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should dig the block below when target is below", async () => {
    const block = { name: "dirt" };
    const bot = {
      entity: { position: { offset: () => ({}) } },
      blockAt: () => block,
      canDigBlock: () => true,
      dig: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new DigBlockSkill(bot);
    await skill.do({ target: "below" });
    assert.same(bot.dig.firstCall.args[0], block);
  });

  it("should dig the block at cursor when target is cursor", async () => {
    const block = { name: "stone" };
    const bot = {
      blockAtCursor: () => block,
      canDigBlock: () => true,
      dig: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new DigBlockSkill(bot);
    await skill.do({ target: "cursor" });
    assert.same(bot.dig.firstCall.args[0], block);
  });

  it("should say no block to dig when block is missing", async () => {
    const bot = {
      blockAtCursor: () => null,
      canDigBlock: () => true,
      dig: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new DigBlockSkill(bot);
    await skill.do({ target: "cursor" });
    assert.equals(bot.chat.firstCall.args[0], "There is no block to dig");
    assert.equals(bot.dig.callCount, 0);
  });

  it("should say cannot dig when block is not diggable", async () => {
    const bot = {
      blockAtCursor: () => ({ name: "bedrock" }),
      canDigBlock: () => false,
      dig: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new DigBlockSkill(bot);
    await skill.do({ target: "cursor" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot dig bedrock");
    assert.equals(bot.dig.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new DigBlockSkill({});
    assert.equals(skill.getId(), "DigBlockSkill");
  });

});
