"use strict";
import referee from "@sinonjs/referee";

import CountEntitiesSkill from "../../lib/skills/count-entities.js";
import CountInventoryItemSkill from "../../lib/skills/count-inventory-item.js";
import FindNearbyThreatsSkill from "../../lib/skills/find-nearby-threats.js";
import FindNearestEntitySkill from "../../lib/skills/find-nearest-entity.js";
import FindNearestPlayerSkill from "../../lib/skills/find-nearest-player.js";
import GetEquippedArmorSkill from "../../lib/skills/get-equipped-armor.js";
import GetInventorySummarySkill from "../../lib/skills/get-inventory-summary.js";
import GetPlayerDistanceSkill from "../../lib/skills/get-player-distance.js";
import GetPlayerPositionSkill from "../../lib/skills/get-player-position.js";
import ListVisiblePlayersSkill from "../../lib/skills/list-visible-players.js";

const assert = referee.assert;

describe("domain query skills", () => {
  const origin = {
    distanceTo: (position) =>
      Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2),
  };

  it("exposes stable skill identifiers", () => {
    const skillClasses = [
      CountEntitiesSkill,
      CountInventoryItemSkill,
      FindNearbyThreatsSkill,
      FindNearestEntitySkill,
      FindNearestPlayerSkill,
      GetEquippedArmorSkill,
      GetInventorySummarySkill,
      GetPlayerDistanceSkill,
      GetPlayerPositionSkill,
      ListVisiblePlayersSkill,
    ];

    skillClasses.forEach((SkillClass) => {
      assert.equals(new SkillClass({}).getId(), SkillClass.name);
    });
  });

  it("queries inventory information", () => {
    const bot = {
      inventory: {
        items: () => [
          { name: "oak_log", count: 2 },
          { name: "oak_log", count: 3 },
        ],
        slots: [null, null, null, null, null, { name: "iron_helmet" }],
      },
    };

    assert.equals(
      new CountInventoryItemSkill(bot).do({ itemName: "oak logs" }),
      5,
    );
    assert.equals(new GetInventorySummarySkill(bot).do({}), [
      "oak_log x 2",
      "oak_log x 3",
    ]);
    assert.equals(new GetEquippedArmorSkill(bot).do({}), ["iron_helmet"]);
  });

  it("queries players and their positions", () => {
    const alice = {
      type: "player",
      username: "alice",
      position: { x: 3, y: 0, z: 4 },
    };
    const bot = {
      username: "npc",
      entity: { position: origin },
      players: { npc: {}, alice: { entity: alice } },
      nearestEntity: (predicate) => (predicate(alice) ? alice : null),
    };

    assert.equals(new ListVisiblePlayersSkill(bot).do({}), ["alice"]);
    assert.same(new FindNearestPlayerSkill(bot).do({}), alice);
    assert.same(
      new GetPlayerPositionSkill(bot).do({ player: "alice" }),
      alice.position,
    );
    assert.isNull(new GetPlayerPositionSkill(bot).do({ player: "bob" }));
    assert.equals(new GetPlayerDistanceSkill(bot).do({ player: "alice" }), 5);
    assert.isNull(new GetPlayerDistanceSkill(bot).do({ player: "bob" }));
  });

  it("queries entities and threats", () => {
    const zombie = {
      name: "zombie",
      type: "mob",
      position: { x: 3, y: 0, z: 4, distanceTo: () => 5 },
    };
    const cow = {
      name: "cow",
      type: "mob",
      position: { x: 40, y: 0, z: 0, distanceTo: () => 40 },
    };
    const distantZombie = {
      name: "zombie",
      type: "mob",
      position: { x: 50, y: 0, z: 0, distanceTo: () => 50 },
    };
    const unknownMob = {
      name: "modded_monster",
      type: "mob",
      position: { distanceTo: () => 2 },
    };
    const droppedItem = {
      name: "item",
      type: "object",
      position: { distanceTo: () => 1 },
    };
    const bot = {
      entity: { position: origin },
      entities: {
        zombie: zombie,
        cow: cow,
        distantZombie: distantZombie,
        unknownMob: unknownMob,
        droppedItem: droppedItem,
      },
      registry: {
        entitiesByName: {
          zombie: { category: "Hostile mobs" },
          cow: { category: "Passive mobs" },
        },
      },
      nearestEntity: (predicate) => (predicate(zombie) ? zombie : null),
    };

    assert.same(
      new FindNearestEntitySkill(bot).do({ entityName: "zombie" }),
      zombie,
    );
    assert.equals(
      new CountEntitiesSkill(bot).do({
        entityName: "zombies",
        maxDistance: 32,
      }),
      1,
    );
    assert.equals(new FindNearbyThreatsSkill(bot).do({ maxDistance: 30 }), [
      "zombie",
    ]);
  });
});
