"use strict";
import PlaceBlockSkill from "../../lib/skills/place-block.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("PlaceBlockSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip the item and place it on a reference block", async () => {
    const torch = { name: "torch" };
    const solidBlock = { name: "stone", boundingBox: "block" };
    const airBlock = { name: "air", boundingBox: "empty" };
    const bot = {
      inventory: { items: () => [torch] },
      entity: {
        position: {
          floored: () => ({ offset: (dx, dy) => ({ dx, dy }) }),
        },
      },
      blockAt: (position) => (position.dy === -1 ? solidBlock : airBlock),
      equip: sinon.stub().resolves(),
      placeBlock: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new PlaceBlockSkill(bot);
    await skill.do({ itemName: "torch" });
    assert.same(bot.equip.firstCall.args[0], torch);
    assert.same(bot.placeBlock.firstCall.args[0], solidBlock);
    assert.equals(bot.placeBlock.firstCall.args[1].y, 1);
  });

  it("should say does not have item when no item matches", async () => {
    const bot = {
      inventory: { items: () => [] },
      chat: sinon.spy(),
      placeBlock: sinon.stub().resolves(),
    };
    const skill = new PlaceBlockSkill(bot);
    await skill.do({ itemName: "torch" });
    assert.equals(bot.chat.firstCall.args[0], "I do not have any torch");
    assert.equals(bot.placeBlock.callCount, 0);
  });

  it("should say no space when no reference block is found", async () => {
    const bot = {
      inventory: { items: () => [{ name: "torch" }] },
      entity: {
        position: {
          floored: () => ({ offset: () => ({}) }),
        },
      },
      blockAt: () => null,
      equip: sinon.stub().resolves(),
      placeBlock: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new PlaceBlockSkill(bot);
    await skill.do({ itemName: "torch" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "There is no space to place a block here",
    );
    assert.equals(bot.placeBlock.callCount, 0);
  });
  it("should return class name as id", () => {
    const skill = new PlaceBlockSkill({});
    assert.equals(skill.getId(), "PlaceBlockSkill");
  });

});
