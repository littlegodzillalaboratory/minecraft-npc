"use strict";
import referee from "@sinonjs/referee";

import GetSurvivalStateSkill from "../../lib/skills/get-survival-state.js";

const assert = referee.assert;

describe("GetSurvivalStateSkill", () => {
  it("should summarize survival observations", () => {
    const position = { x: 0, y: 64, z: 0 };
    const bot = {
      health: 18,
      food: 12,
      time: { timeOfDay: 13000 },
      entity: { position: position },
      inventory: {
        items: () => [
          { name: "bread", count: 2 },
          { name: "stone", count: 64 },
        ],
      },
      registry: {
        foodsByName: { bread: {} },
        entitiesByName: {
          zombie: { category: "Hostile mobs" },
          cow: { category: "Passive mobs" },
        },
      },
      entities: {
        zombie: {
          name: "zombie",
          position: { distanceTo: () => 5 },
        },
        cow: { name: "cow", position: { distanceTo: () => 2 } },
        distantZombie: {
          name: "zombie",
          position: { distanceTo: () => 50 },
        },
      },
      canSeeEntity: (entity) => entity.name === "zombie",
    };
    const skill = new GetSurvivalStateSkill(bot);

    assert.equals(skill.do({ threatRadius: 16 }), {
      health: 18,
      hunger: 12,
      foodCount: 2,
      nearbyThreats: [{ name: "zombie", distance: 5 }],
      timeOfDay: 13000,
      position: position,
    });
    assert.equals(skill.getId(), "GetSurvivalStateSkill");
  });
});
