"use strict";
import referee from "@sinonjs/referee";

import FindNearestAllowedAnimalSkill from "../../lib/skills/find-nearest-allowed-animal.js";

const assert = referee.assert;

describe("FindNearestAllowedAnimalSkill", () => {
  const position = { distanceTo: () => 5 };

  it("should return an allowed adult animal within range", () => {
    const chicken = { name: "chicken", position: position };
    const bot = {
      entity: { position: {} },
      nearestEntity: (predicate) => (predicate(chicken) ? chicken : null),
    };
    const skill = new FindNearestAllowedAnimalSkill(bot);

    assert.same(
      skill.do({ allowedAnimals: ["chicken"], maximumDistance: 32 }),
      chicken,
    );
    assert.equals(skill.getId(), "FindNearestAllowedAnimalSkill");
  });

  it("should reject disallowed, distant, baby, named, and tamed animals", () => {
    const candidates = [
      { name: "cow", position: position },
      { name: "chicken", position: { distanceTo: () => 50 } },
      { name: "chicken", position: position, isBaby: true },
      { name: "chicken", position: position, customName: "Clucky" },
      { name: "chicken", position: position, ownerUuid: "owner" },
    ];
    const bot = {
      entity: { position: {} },
      nearestEntity: (predicate) =>
        candidates.find((candidate) => predicate(candidate)) || null,
    };
    const skill = new FindNearestAllowedAnimalSkill(bot);

    assert.isNull(
      skill.do({ allowedAnimals: ["chicken"], maximumDistance: 32 }),
    );
  });
});
