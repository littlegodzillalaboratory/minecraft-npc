"use strict";
import HuntFoodSkill from "../../lib/skills/hunt-food.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("HuntFoodSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should attack the nearest food animal", () => {
    const chicken = {
      name: "chicken",
      position: { distanceTo: () => 5 },
    };
    const bot = {
      entity: { position: {} },
      nearestEntity: (predicate) => (predicate(chicken) ? chicken : null),
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new HuntFoodSkill(bot);
    skill.do({ allowedAnimals: ["chicken"], maximumDistance: 32 });
    assert.same(bot.pvp.attack.firstCall.args[0], chicken);
  });

  it("should protect disallowed, distant, baby, named, and tamed animals", () => {
    const animals = [
      { name: "cow", position: { distanceTo: () => 5 } },
      { name: "chicken", position: { distanceTo: () => 50 } },
      { name: "chicken", position: { distanceTo: () => 5 }, isBaby: true },
      {
        name: "chicken",
        position: { distanceTo: () => 5 },
        customName: "Clucky",
      },
      {
        name: "chicken",
        position: { distanceTo: () => 5 },
        ownerUuid: "owner",
      },
    ];
    const bot = {
      entity: { position: {} },
      nearestEntity: (predicate) =>
        animals.find((animal) => predicate(animal)) || null,
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };

    new HuntFoodSkill(bot).do({
      allowedAnimals: ["chicken"],
      maximumDistance: 32,
    });

    assert.equals(bot.pvp.attack.callCount, 0);
  });

  it("should say nothing to hunt when no food animal is nearby", () => {
    const bot = {
      entity: { position: {} },
      nearestEntity: () => null,
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new HuntFoodSkill(bot);
    skill.do({ allowedAnimals: ["chicken"], maximumDistance: 32 });
    assert.equals(
      bot.chat.firstCall.args[0],
      "There is nothing to hunt nearby",
    );
  });
  it("should return class name as id", () => {
    const skill = new HuntFoodSkill({});
    assert.equals(skill.getId(), "HuntFoodSkill");
  });
});
