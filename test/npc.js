"use strict";
import pathfinder from "mineflayer-pathfinder";
import Npc from "../lib/npc.js";
import Register from "../lib/register.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";
const assert = referee.assert;

describe("Npc", () => {
  describe("eat", () => {
    it("should execute eat", () => {
      const bot = {
        username: "bob",
        inventory: { items: () => [] },
        registry: { itemsByName: {} },
        equip: sinon.stub().resolves(),
        consume: sinon.stub().resolves(),
        chat: sinon.spy(),
      };
      const npc = new Npc(bot, new Register(), {});
      assert.equals(npc.eat(), "success");
    });
  });

  describe("sleep", () => {
    it("should execute sleep", () => {
      const bot = {
        username: "bob",
        registry: {
          blocksByName: {
            red_bed: { id: 1, name: "red_bed" },
          },
        },
        findBlock: sinon.stub().returns(null),
        sleep: sinon.stub().resolves(),
        chat: sinon.spy(),
      };
      const npc = new Npc(bot, new Register(), {});
      assert.equals(npc.sleep(), "success");
    });
  });

  describe("stop", () => {
    it("should stop bot movement, combat, and controls", () => {
      const mockBot = {
        username: "bob",
        pathfinder: {
          stop: sinon.spy(),
          setGoal: sinon.spy(),
        },
        pvp: {
          stop: sinon.spy(),
        },
        clearControlStates: sinon.spy(),
      };
      const npc = new Npc(mockBot, new Register(), {});

      const status = npc.stop();

      assert.equals(status, "success");
      assert.equals(mockBot.pathfinder.stop.callCount, 1);
      assert.equals(mockBot.pathfinder.setGoal.callCount, 1);
      assert.equals(mockBot.pathfinder.setGoal.firstCall.args[0], null);
      assert.equals(mockBot.pvp.stop.callCount, 1);
      assert.equals(mockBot.clearControlStates.callCount, 1);
    });
  });

  describe("moveBlocksDistanceToDirection", () => {
    it("should move the bot the requested number of blocks in a direction", () => {
      const originalMovements = pathfinder.Movements;
      const originalGoalNear = pathfinder.goals.GoalNear;
      try {
        pathfinder.Movements = class {
          constructor(bot) {
            this.bot = bot;
          }
        };
        pathfinder.goals.GoalNear = class {
          constructor(x, y, z, range) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.range = range;
          }
        };
        const mockBot = {
          username: "bob",
          entity: {
            position: {
              x: 10,
              y: 64,
              z: 10,
              offset: (x, y, z) => ({ x: 10 + x, y: 64 + y, z: 10 + z }),
            },
            yaw: 0,
          },
          pathfinder: {
            setMovements: sinon.spy(),
            setGoal: sinon.spy(),
          },
        };
        const npc = new Npc(mockBot, new Register(), {});

        const status = npc.moveBlocksDistanceToDirection(5, "forward");

        assert.equals(status, "success");
        assert.equals(mockBot.pathfinder.setMovements.callCount, 1);
        assert.equals(mockBot.pathfinder.setGoal.callCount, 1);
        assert.equals(mockBot.pathfinder.setGoal.firstCall.args[0].x, 10);
        assert.equals(mockBot.pathfinder.setGoal.firstCall.args[0].y, 64);
        assert.equals(mockBot.pathfinder.setGoal.firstCall.args[0].z, 15);
      } finally {
        pathfinder.Movements = originalMovements;
        pathfinder.goals.GoalNear = originalGoalNear;
      }
    });
  });

  describe("getBot / getRegister / getOpts", () => {
    it("should return bot/register/opts references", () => {
      const bot = { entity: { position: { x: 1, y: 2, z: 3 } }, players: {} };
      const register = new Register();
      const opts = { a: 1 };
      const npc = new Npc(bot, register, opts);
      assert.same(npc.getBot(), bot);
      assert.same(npc.getRegister(), register);
      assert.same(npc.getOpts(), opts);
    });
  });

  describe("getPosition / getPlayerPosition", () => {
    it("should return own and player position", () => {
      const bot = {
        entity: { position: { x: 1, y: 2, z: 3 } },
        players: { alice: { entity: { position: { x: 4, y: 5, z: 6 } } } },
      };
      const npc = new Npc(bot, new Register(), {});
      assert.equals(npc.getPosition().x, 1);
      assert.equals(npc.getPlayerPosition("alice").x, 4);
    });
  });

  describe("emptyInventory", () => {
    it("should execute emptyInventory", () => {
      const bot = {
        username: "bob",
        inventory: { items: () => [] },
        tossStack: () => {},
      };
      const npc = new Npc(bot, new Register(), {});
      assert.equals(npc.emptyInventory(), "success");
    });
  });

  describe("moveToLocation / guardLocation / messageChatGpt / sayMessage", () => {
    it("should execute moveToLocation, guardLocation, messageChatGpt, and sayMessage", async () => {
      const originalMovements = pathfinder.Movements;
      const originalGoalNear = pathfinder.goals.GoalNear;
      pathfinder.Movements = class {
        constructor(bot) {
          this.bot = bot;
        }
      };
      pathfinder.goals.GoalNear = class {
        constructor(x, y, z, range) {
          this.x = x;
          this.y = y;
          this.z = z;
          this.range = range;
        }
      };

      const bot = {
        username: "bob",
        inventory: { items: () => [] },
        tossStack: () => {},
        pathfinder: { setMovements: () => {}, setGoal: () => {} },
        registry: { entitiesByName: { zombie: { category: "Hostile mobs" } } },
        entities: {
          1: { type: "mob", name: "zombie", position: { x: 5, y: 64, z: 5 } },
        },
        pvp: { attack: sinon.spy() },
        chatgpt: { sendMessage: async () => "ok" },
        chat: () => {},
      };
      try {
        const npc = new Npc(bot, new Register(), {});
        assert.equals(npc.moveToLocation(1, 2, 3), "success");
        assert.equals(npc.guardLocation(1, 2, 3), "success");
        assert.equals(npc.sayMessage("hello"), "success");
        assert.equals(npc.messageChatGpt("alice", "hello"), "success");
      } finally {
        pathfinder.Movements = originalMovements;
        pathfinder.goals.GoalNear = originalGoalNear;
      }
    });
  });

  describe("validation", () => {
    it("should fail validation branch", () => {
      const bot = {
        username: "bob",
        pathfinder: { setMovements: () => {}, setGoal: () => {} },
        chat: () => {},
        chatgpt: { sendMessage: async () => "ok" },
      };
      const npc = new Npc(bot, new Register(), {});
      assert.equals(npc.moveToLocation("a", 2, 3), "failed");
      assert.equals(npc.sayMessage(""), "failed");
      assert.equals(npc.moveBlocksDistanceToDirection(0, "forward"), "failed");
    });
  });

  describe("moveToObject", () => {
    it("should move to a discoverable object or say when it cannot be found", () => {
      const bot = {
        username: "bob",
        entity: { position: { x: 0, y: 0, z: 0 } },
        registry: {
          blocksByName: {
            red_bed: { id: 1, name: "red_bed" },
          },
        },
        findBlock: sinon.stub(),
        pathfinder: { setMovements: sinon.spy(), setGoal: sinon.spy() },
        chat: sinon.spy(),
      };

      const originalMovements = pathfinder.Movements;
      const originalGoalNear = pathfinder.goals.GoalNear;
      try {
        pathfinder.Movements = class {
          constructor(botRef) {
            this.bot = botRef;
          }
        };
        pathfinder.goals.GoalNear = class {
          constructor(x, y, z, range) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.range = range;
          }
        };

        bot.findBlock
          .onFirstCall()
          .returns({ position: { x: 8, y: 9, z: 10 } });
        bot.findBlock.onSecondCall().returns(undefined);

        const npc = new Npc(bot, new Register(), {});
        assert.equals(npc.moveToObject("bed"), "success");
        assert.equals(bot.pathfinder.setGoal.callCount, 1);
        assert.equals(npc.moveToObject("bedroom"), "success");
        assert.equals(bot.chat.firstCall.args[0], "I cannot find any bedroom");
      } finally {
        pathfinder.Movements = originalMovements;
        pathfinder.goals.GoalNear = originalGoalNear;
      }
    });
  });
});

import FollowPlayerSkill from "../lib/skills/follow-player.js";
import JumpSkill from "../lib/skills/jump.js";
import LookAtLocationSkill from "../lib/skills/look-at-location.js";
import FaceDirectionSkill from "../lib/skills/face-direction.js";
import WanderSkill from "../lib/skills/wander.js";
import AttackPlayerSkill from "../lib/skills/attack-player.js";
import AttackNearestEntitySkill from "../lib/skills/attack-nearest-entity.js";
import HuntFoodSkill from "../lib/skills/hunt-food.js";
import DefendPlayerSkill from "../lib/skills/defend-player.js";
import FleeSkill from "../lib/skills/flee.js";
import EquipItemSkill from "../lib/skills/equip-item.js";
import EquipArmorSkill from "../lib/skills/equip-armor.js";
import UnequipItemSkill from "../lib/skills/unequip-item.js";
import DropItemSkill from "../lib/skills/drop-item.js";
import TossHeldItemSkill from "../lib/skills/toss-held-item.js";
import GiveItemSkill from "../lib/skills/give-item.js";
import EatFoodSkill from "../lib/skills/eat-food.js";
import CollectItemsSkill from "../lib/skills/collect-items.js";
import DigBlockSkill from "../lib/skills/dig-block.js";
import PlaceBlockSkill from "../lib/skills/place-block.js";
import CollectBlockSkill from "../lib/skills/collect-block.js";
import HarvestCropsSkill from "../lib/skills/harvest-crops.js";
import PlantSeedsSkill from "../lib/skills/plant-seeds.js";
import TillSoilSkill from "../lib/skills/till-soil.js";
import ActivateBlockSkill from "../lib/skills/activate-block.js";
import BuildPillarSkill from "../lib/skills/build-pillar.js";
import CraftItemSkill from "../lib/skills/craft-item.js";
import SmeltItemSkill from "../lib/skills/smelt-item.js";
import ListChestSkill from "../lib/skills/list-chest.js";
import DepositToChestSkill from "../lib/skills/deposit-to-chest.js";
import WithdrawFromChestSkill from "../lib/skills/withdraw-from-chest.js";
import MountEntitySkill from "../lib/skills/mount-entity.js";
import DismountSkill from "../lib/skills/dismount.js";
import FishSkill from "../lib/skills/fish.js";
import UseItemOnEntitySkill from "../lib/skills/use-item-on-entity.js";
import FeedAnimalSkill from "../lib/skills/feed-animal.js";
import BreedAnimalsSkill from "../lib/skills/breed-animals.js";
import ActivateItemSkill from "../lib/skills/activate-item.js";
import SneakSkill from "../lib/skills/sneak.js";
import SprintSkill from "../lib/skills/sprint.js";
import SwingArmSkill from "../lib/skills/swing-arm.js";
import DanceSkill from "../lib/skills/dance.js";
import GestureSkill from "../lib/skills/gesture.js";
import WhisperSkill from "../lib/skills/whisper.js";

describe("Npc catalog methods", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("followPlayer", () => {
    it("should execute followPlayer", () => {
      sinon.stub(FollowPlayerSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.followPlayer("alice"), "success");
      assert.equals(FollowPlayerSkill.prototype.do.callCount, 1);
    });
  });

  describe("jump", () => {
    it("should execute jump", () => {
      sinon.stub(JumpSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.jump(), "success");
      assert.equals(JumpSkill.prototype.do.callCount, 1);
    });
  });

  describe("lookAtLocation", () => {
    it("should execute lookAtLocation", () => {
      sinon.stub(LookAtLocationSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.lookAtLocation(1, 2, 3), "success");
      assert.equals(LookAtLocationSkill.prototype.do.callCount, 1);
    });
  });

  describe("faceDirection", () => {
    it("should execute faceDirection", () => {
      sinon.stub(FaceDirectionSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.faceDirection("north"), "success");
      assert.equals(FaceDirectionSkill.prototype.do.callCount, 1);
    });
  });

  describe("wander", () => {
    it("should execute wander", () => {
      sinon.stub(WanderSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.wander(), "success");
      assert.equals(WanderSkill.prototype.do.callCount, 1);
    });
  });

  describe("attackPlayer", () => {
    it("should execute attackPlayer", () => {
      sinon.stub(AttackPlayerSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.attackPlayer("carol"), "success");
      assert.equals(AttackPlayerSkill.prototype.do.callCount, 1);
    });
  });

  describe("attackNearestEntity", () => {
    it("should execute attackNearestEntity", () => {
      sinon.stub(AttackNearestEntitySkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.attackNearestEntity("zombie"), "success");
      assert.equals(AttackNearestEntitySkill.prototype.do.callCount, 1);
    });
  });

  describe("huntFood", () => {
    it("should execute huntFood", () => {
      sinon.stub(HuntFoodSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.huntFood(), "success");
      assert.equals(HuntFoodSkill.prototype.do.callCount, 1);
    });
  });

  describe("defendPlayer", () => {
    it("should execute defendPlayer", () => {
      sinon.stub(DefendPlayerSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.defendPlayer("alice"), "success");
      assert.equals(DefendPlayerSkill.prototype.do.callCount, 1);
    });
  });

  describe("flee", () => {
    it("should execute flee", () => {
      sinon.stub(FleeSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.flee(), "success");
      assert.equals(FleeSkill.prototype.do.callCount, 1);
    });
  });

  describe("equipItem", () => {
    it("should execute equipItem", () => {
      sinon.stub(EquipItemSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.equipItem("sword", "hand"), "success");
      assert.equals(EquipItemSkill.prototype.do.callCount, 1);
    });
  });

  describe("equipArmor", () => {
    it("should execute equipArmor", () => {
      sinon.stub(EquipArmorSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.equipArmor(), "success");
      assert.equals(EquipArmorSkill.prototype.do.callCount, 1);
    });
  });

  describe("unequipItem", () => {
    it("should execute unequipItem", () => {
      sinon.stub(UnequipItemSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.unequipItem(), "success");
      assert.equals(UnequipItemSkill.prototype.do.callCount, 1);
    });
  });

  describe("dropItem", () => {
    it("should execute dropItem", () => {
      sinon.stub(DropItemSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.dropItem("stone"), "success");
      assert.equals(DropItemSkill.prototype.do.callCount, 1);
    });
  });

  describe("tossHeldItem", () => {
    it("should execute tossHeldItem", () => {
      sinon.stub(TossHeldItemSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.tossHeldItem(), "success");
      assert.equals(TossHeldItemSkill.prototype.do.callCount, 1);
    });
  });

  describe("giveItem", () => {
    it("should execute giveItem", () => {
      sinon.stub(GiveItemSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.giveItem("alice", "apple"), "success");
      assert.equals(GiveItemSkill.prototype.do.callCount, 1);
    });
  });

  describe("eatFood", () => {
    it("should execute eatFood", () => {
      sinon.stub(EatFoodSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.eatFood("apple"), "success");
      assert.equals(EatFoodSkill.prototype.do.callCount, 1);
    });
  });

  describe("collectItems", () => {
    it("should execute collectItems", () => {
      sinon.stub(CollectItemsSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.collectItems(), "success");
      assert.equals(CollectItemsSkill.prototype.do.callCount, 1);
    });
  });

  describe("digBlock", () => {
    it("should execute digBlock", () => {
      sinon.stub(DigBlockSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.digBlock("below"), "success");
      assert.equals(DigBlockSkill.prototype.do.callCount, 1);
    });
  });

  describe("placeBlock", () => {
    it("should execute placeBlock", () => {
      sinon.stub(PlaceBlockSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.placeBlock("torch"), "success");
      assert.equals(PlaceBlockSkill.prototype.do.callCount, 1);
    });
  });

  describe("collectBlock", () => {
    it("should execute collectBlock", () => {
      sinon.stub(CollectBlockSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.collectBlock("coal"), "success");
      assert.equals(CollectBlockSkill.prototype.do.callCount, 1);
    });
  });

  describe("harvestCrops", () => {
    it("should execute harvestCrops", () => {
      sinon.stub(HarvestCropsSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.harvestCrops(), "success");
      assert.equals(HarvestCropsSkill.prototype.do.callCount, 1);
    });
  });

  describe("plantSeeds", () => {
    it("should execute plantSeeds", () => {
      sinon.stub(PlantSeedsSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.plantSeeds(), "success");
      assert.equals(PlantSeedsSkill.prototype.do.callCount, 1);
    });
  });

  describe("tillSoil", () => {
    it("should execute tillSoil", () => {
      sinon.stub(TillSoilSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.tillSoil(), "success");
      assert.equals(TillSoilSkill.prototype.do.callCount, 1);
    });
  });

  describe("activateBlock", () => {
    it("should execute activateBlock", () => {
      sinon.stub(ActivateBlockSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.activateBlock("lever"), "success");
      assert.equals(ActivateBlockSkill.prototype.do.callCount, 1);
    });
  });

  describe("buildPillar", () => {
    it("should execute buildPillar", () => {
      sinon.stub(BuildPillarSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.buildPillar(3), "success");
      assert.equals(BuildPillarSkill.prototype.do.callCount, 1);
    });
  });

  describe("craftItem", () => {
    it("should execute craftItem", () => {
      sinon.stub(CraftItemSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.craftItem("sticks"), "success");
      assert.equals(CraftItemSkill.prototype.do.callCount, 1);
    });
  });

  describe("smeltItem", () => {
    it("should execute smeltItem", () => {
      sinon.stub(SmeltItemSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.smeltItem("iron ore"), "success");
      assert.equals(SmeltItemSkill.prototype.do.callCount, 1);
    });
  });

  describe("listChest", () => {
    it("should execute listChest", () => {
      sinon.stub(ListChestSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.listChest(), "success");
      assert.equals(ListChestSkill.prototype.do.callCount, 1);
    });
  });

  describe("depositToChest", () => {
    it("should execute depositToChest", () => {
      sinon.stub(DepositToChestSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.depositToChest(), "success");
      assert.equals(DepositToChestSkill.prototype.do.callCount, 1);
    });
  });

  describe("withdrawFromChest", () => {
    it("should execute withdrawFromChest", () => {
      sinon.stub(WithdrawFromChestSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.withdrawFromChest("bread"), "success");
      assert.equals(WithdrawFromChestSkill.prototype.do.callCount, 1);
    });
  });

  describe("withdrawAllFromChest", () => {
    it("should execute withdrawAllFromChest", () => {
      sinon.stub(WithdrawFromChestSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.withdrawAllFromChest(), "success");
      assert.equals(WithdrawFromChestSkill.prototype.do.callCount, 1);
    });
  });

  describe("mountEntity", () => {
    it("should execute mountEntity", () => {
      sinon.stub(MountEntitySkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.mountEntity("horse"), "success");
      assert.equals(MountEntitySkill.prototype.do.callCount, 1);
    });
  });

  describe("dismount", () => {
    it("should execute dismount", () => {
      sinon.stub(DismountSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.dismount(), "success");
      assert.equals(DismountSkill.prototype.do.callCount, 1);
    });
  });

  describe("fish", () => {
    it("should execute fish", () => {
      sinon.stub(FishSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.fish(), "success");
      assert.equals(FishSkill.prototype.do.callCount, 1);
    });
  });

  describe("useItemOnEntity", () => {
    it("should execute useItemOnEntity", () => {
      sinon.stub(UseItemOnEntitySkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.useItemOnEntity("bucket", "cow"), "success");
      assert.equals(UseItemOnEntitySkill.prototype.do.callCount, 1);
    });
  });

  describe("feedAnimal", () => {
    it("should execute feedAnimal", () => {
      sinon.stub(FeedAnimalSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.feedAnimal("cow"), "success");
      assert.equals(FeedAnimalSkill.prototype.do.callCount, 1);
    });
  });

  describe("breedAnimals", () => {
    it("should execute breedAnimals", () => {
      sinon.stub(BreedAnimalsSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.breedAnimals("cow"), "success");
      assert.equals(BreedAnimalsSkill.prototype.do.callCount, 1);
    });
  });

  describe("activateItem", () => {
    it("should execute activateItem", () => {
      sinon.stub(ActivateItemSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.activateItem("egg"), "success");
      assert.equals(ActivateItemSkill.prototype.do.callCount, 1);
    });
  });

  describe("sneak", () => {
    it("should execute sneak", () => {
      sinon.stub(SneakSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.sneak(true), "success");
      assert.equals(SneakSkill.prototype.do.callCount, 1);
    });
  });

  describe("sprint", () => {
    it("should execute sprint", () => {
      sinon.stub(SprintSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.sprint(), "success");
      assert.equals(SprintSkill.prototype.do.callCount, 1);
    });
  });

  describe("swingArm", () => {
    it("should execute swingArm", () => {
      sinon.stub(SwingArmSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.swingArm(), "success");
      assert.equals(SwingArmSkill.prototype.do.callCount, 1);
    });
  });

  describe("dance", () => {
    it("should execute dance", () => {
      sinon.stub(DanceSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.dance(), "success");
      assert.equals(DanceSkill.prototype.do.callCount, 1);
    });
  });

  describe("gesture", () => {
    it("should execute gesture", () => {
      sinon.stub(GestureSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.gesture("nod"), "success");
      assert.equals(GestureSkill.prototype.do.callCount, 1);
    });
  });

  describe("whisper", () => {
    it("should execute whisper", () => {
      sinon.stub(WhisperSkill.prototype, "do");
      const npc = new Npc({ username: "bob" }, new Register(), {});
      assert.equals(npc.whisper("alice", "psst"), "success");
      assert.equals(WhisperSkill.prototype.do.callCount, 1);
    });
  });
});
