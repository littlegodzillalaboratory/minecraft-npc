"use strict";
import BreedAnimalsSkill from "../../lib/skills/breed-animals.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("BreedAnimalsSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should feed two nearby animals of the given kind", async () => {
    const cowOne = { name: "cow", position: { distanceTo: () => 4 } };
    const cowTwo = { name: "cow", position: { distanceTo: () => 6 } };
    const wheat = { name: "wheat" };
    const bot = {
      entities: { 1: cowOne, 2: cowTwo },
      entity: { position: {} },
      inventory: { items: () => [wheat] },
      equip: sinon.stub().resolves(),
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new BreedAnimalsSkill(bot);
    await skill.do({ entityName: "cow" });
    assert.equals(bot.useOn.callCount, 2);
    assert.same(bot.useOn.firstCall.args[0], cowOne);
    assert.same(bot.useOn.secondCall.args[0], cowTwo);
  });

  it("should say cannot find two animals when fewer than two are nearby", async () => {
    const cowOne = { name: "cow", position: { distanceTo: () => 4 } };
    const bot = {
      entities: { 1: cowOne },
      entity: { position: {} },
      inventory: { items: () => [{ name: "wheat" }] },
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new BreedAnimalsSkill(bot);
    await skill.do({ entityName: "cow" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "I cannot find two cow to breed nearby",
    );
    assert.equals(bot.useOn.callCount, 0);
  });

  it("should say no food to breed with when inventory lacks it", async () => {
    const cowOne = { name: "cow", position: { distanceTo: () => 4 } };
    const cowTwo = { name: "cow", position: { distanceTo: () => 6 } };
    const bot = {
      entities: { 1: cowOne, 2: cowTwo },
      entity: { position: {} },
      inventory: { items: () => [] },
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new BreedAnimalsSkill(bot);
    await skill.do({ entityName: "cow" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "I have no food to breed the cow with",
    );
  });
  it("should default to wheat for unlisted animal species", async () => {
    const nameless = { position: { distanceTo: () => 4 } };
    const alpacaOne = { name: "alpaca", position: { distanceTo: () => 4 } };
    const alpacaTwo = { name: "alpaca", position: { distanceTo: () => 6 } };
    const wheat = { name: "wheat" };
    const bot = {
      entities: { 1: nameless, 2: alpacaOne, 3: alpacaTwo },
      entity: { position: {} },
      inventory: { items: () => [wheat] },
      equip: sinon.stub().resolves(),
      useOn: sinon.stub().resolves(),
      chat: sinon.spy(),
    };
    const skill = new BreedAnimalsSkill(bot);
    await skill.do({ entityName: "alpaca" });
    assert.same(bot.equip.firstCall.args[0], wheat);
    assert.equals(bot.useOn.callCount, 2);
  });

  it("should return class name as id", () => {
    const skill = new BreedAnimalsSkill({});
    assert.equals(skill.getId(), "BreedAnimalsSkill");
  });

});
