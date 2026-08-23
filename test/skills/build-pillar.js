"use strict";
import BuildPillarSkill from "../../lib/skills/build-pillar.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("BuildPillarSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should equip a block and place one block per pillar level", async () => {
    const dirt = { name: "dirt" };
    const referenceBlock = { name: "dirt" };
    const bot = {
      inventory: { items: () => [dirt] },
      registry: { blocksByName: { dirt: { id: 3 } } },
      entity: {
        position: { floored: () => ({ offset: () => ({}) }) },
      },
      blockAt: () => referenceBlock,
      equip: sinon.stub().resolves(),
      placeBlock: sinon.stub().resolves(),
      setControlState: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new BuildPillarSkill(bot);
    await skill.do({ height: 2, stepInMillis: 0 });
    assert.same(bot.equip.firstCall.args[0], dirt);
    assert.equals(bot.placeBlock.callCount, 2);
    assert.equals(bot.chat.callCount, 0);
  });

  it("should say no blocks when inventory has no placeable block", async () => {
    const bot = {
      inventory: { items: () => [{ name: "iron_sword" }] },
      registry: { blocksByName: {} },
      placeBlock: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new BuildPillarSkill(bot);
    await skill.do({ height: 2, stepInMillis: 0 });
    assert.equals(bot.chat.firstCall.args[0], "I have no blocks to build with");
    assert.equals(bot.placeBlock.callCount, 0);
  });

  it("should report how many blocks could not be placed", async () => {
    const dirt = { name: "dirt" };
    const bot = {
      inventory: { items: () => [dirt] },
      registry: { blocksByName: { dirt: { id: 3 } } },
      entity: {
        position: { floored: () => ({ offset: () => ({}) }) },
      },
      blockAt: () => ({ name: "dirt" }),
      equip: sinon.stub().resolves(),
      placeBlock: sinon.stub().rejects(new Error("someerror")),
      setControlState: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new BuildPillarSkill(bot);
    await skill.do({ height: 2, stepInMillis: 0 });
    assert.equals(
      bot.chat.firstCall.args[0],
      "I could not place 2 of the pillar blocks",
    );
  });
  it("should default the step delay when not specified", async () => {
    const dirt = { name: "dirt" };
    const bot = {
      inventory: { items: () => [dirt] },
      registry: { blocksByName: { dirt: { id: 3 } } },
      equip: sinon.stub().resolves(),
      placeBlock: sinon.stub().resolves(),
      setControlState: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new BuildPillarSkill(bot);
    await skill.do({ height: 0 });
    assert.equals(bot.placeBlock.callCount, 0);
  });

  it("should return class name as id", () => {
    const skill = new BuildPillarSkill({});
    assert.equals(skill.getId(), "BuildPillarSkill");
  });

});
