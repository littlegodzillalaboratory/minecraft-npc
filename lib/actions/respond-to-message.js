"use strict";
import BaseAction from "./base.js";
import bag from "bagofcli";
import EatAction from "./eat.js";
import EmptyInventoryAction from "./empty-inventory.js";
import GuardCurrentLocationAction from "./guard-current-location.js";
import MoveBlocksDistanceToDirectionAction from "./move-blocks-distance-to-direction.js";
import MoveToObjectAction from "./move-to-object.js";
import MoveToPlayerLocationAction from "./move-to-player-location.js";
import SayCurrentLocationAction from "./say-current-location.js";
import SleepAction from "./sleep.js";
import ForwardToChatGptAction from "./forward-to-chatgpt.js";
import StopCurrentAction from "./stop-current-action.js";
import FollowPlayerAction from "./follow-player.js";
import StopFollowingAction from "./stop-following.js";
import MoveToCoordinatesAction from "./move-to-coordinates.js";
import GoHomeAction from "./go-home.js";
import JumpAction from "./jump.js";
import LookAtPlayerAction from "./look-at-player.js";
import FaceDirectionAction from "./face-direction.js";
import TurnAroundAction from "./turn-around.js";
import WanderAroundAction from "./wander-around.js";
import BackAwayAction from "./back-away.js";
import GoToPlayerAction from "./go-to-player.js";
import StayHereAction from "./stay-here.js";
import AttackPlayerAction from "./attack-player.js";
import AttackNearestMobAction from "./attack-nearest-mob.js";
import DefendMeAction from "./defend-me.js";
import FleeAction from "./flee.js";
import EquipItemAction from "./equip-item.js";
import EquipWeaponAction from "./equip-weapon.js";
import EquipShieldAction from "./equip-shield.js";
import EquipArmorAction from "./equip-armor.js";
import StandDownAction from "./stand-down.js";
import HuntFoodAction from "./hunt-food.js";
import ReportThreatsAction from "./report-threats.js";
import ListInventoryAction from "./list-inventory.js";
import DropItemAction from "./drop-item.js";
import GiveItemToPlayerAction from "./give-item-to-player.js";
import UnequipItemAction from "./unequip-item.js";
import TossHeldItemAction from "./toss-held-item.js";
import CountItemAction from "./count-item.js";
import SayHeldItemAction from "./say-held-item.js";
import SayArmorAction from "./say-armor.js";
import FindItemAction from "./find-item.js";
import EatSpecificFoodAction from "./eat-specific-food.js";
import MineBlockAction from "./mine-block.js";
import MineTargetBlockAction from "./mine-target-block.js";
import DigDownAction from "./dig-down.js";
import CollectDropsAction from "./collect-drops.js";
import ChopTreeAction from "./chop-tree.js";
import HarvestCropsAction from "./harvest-crops.js";
import PlantSeedsAction from "./plant-seeds.js";
import TillSoilAction from "./till-soil.js";
import OpenDoorAction from "./open-door.js";
import CloseDoorAction from "./close-door.js";
import FlipLeverAction from "./flip-lever.js";
import PressButtonAction from "./press-button.js";
import RingBellAction from "./ring-bell.js";
import BuildPillarAction from "./build-pillar.js";
import PlaceBlockAction from "./place-block.js";
import PlaceCraftingTableAction from "./place-crafting-table.js";
import PlaceTorchAction from "./place-torch.js";
import CraftItemAction from "./craft-item.js";
import SmeltItemAction from "./smelt-item.js";
import SayChestContentsAction from "./say-chest-contents.js";
import DepositToChestAction from "./deposit-to-chest.js";
import WithdrawItemFromChestAction from "./withdraw-item-from-chest.js";
import EmptyChestAction from "./empty-chest.js";
import MountEntityAction from "./mount-entity.js";
import DismountAction from "./dismount.js";
import FishAction from "./fish.js";
import FeedAnimalAction from "./feed-animal.js";
import BreedAnimalsAction from "./breed-animals.js";
import MilkCowAction from "./milk-cow.js";
import ShearSheepAction from "./shear-sheep.js";
import CountEntitiesAction from "./count-entities.js";
import FindNearestEntityAction from "./find-nearest-entity.js";
import ThrowEggAction from "./throw-egg.js";
import SayHealthAction from "./say-health.js";
import SayFoodLevelAction from "./say-food-level.js";
import SayTimeAction from "./say-time.js";
import SayWeatherAction from "./say-weather.js";
import SayBiomeAction from "./say-biome.js";
import ListPlayersAction from "./list-players.js";
import SayDimensionAction from "./say-dimension.js";
import SayVersionAction from "./say-version.js";
import SayLatestActionAction from "./say-latest-action.js";
import SayActionCountAction from "./say-action-count.js";
import SayExperienceAction from "./say-experience.js";
import SayLightLevelAction from "./say-light-level.js";
import SayElevationAction from "./say-elevation.js";
import SayDistanceToPlayerAction from "./say-distance-to-player.js";
import SayNearestPlayerAction from "./say-nearest-player.js";
import SayUptimeAction from "./say-uptime.js";
import GreetAction from "./greet.js";
import FarewellAction from "./farewell.js";
import ThankYouResponseAction from "./thank-you-response.js";
import TellJokeAction from "./tell-joke.js";
import TellFactAction from "./tell-fact.js";
import SingSongAction from "./sing-song.js";
import DanceAction from "./dance.js";
import WaveAction from "./wave.js";
import NodAction from "./nod.js";
import ShakeHeadAction from "./shake-head.js";
import SneakAction from "./sneak.js";
import StandUpAction from "./stand-up.js";
import SprintAction from "./sprint.js";
import CoinFlipAction from "./coin-flip.js";
import RollDiceAction from "./roll-dice.js";
import CountdownAction from "./countdown.js";
import ComplimentPlayerAction from "./compliment-player.js";
import WhisperSecretAction from "./whisper-secret.js";

const MESSAGE_MAPPING = [
  {
    action: "EatAction",
    regexes: [
      "^eat$",
      "^eat something$",
      "^eat food$",
      "^i am hungry$",
      "^i'm hungry$",
    ],
  },
  {
    action: "EmptyInventoryAction",
    regexes: ["^empty inventory$", "^drop all items$", "^clear inventory$"],
  },
  {
    action: "SayCurrentLocationAction",
    regexes: ["^what is your location\\?$", "^send location$"],
  },
  {
    action: "GuardCurrentLocationAction",
    regexes: ["^guard the area$", "^defend the area$", "^stand your ground$"],
  },
  {
    action: "MoveToPlayerLocationAction",
    regexes: ["^come here$", "^get over here$"],
  },
  {
    action: "SleepAction",
    regexes: ["^go to sleep$", "^time to sleep$", "^sleep$"],
  },
  {
    action: "StopCurrentAction",
    regexes: ["^stop$", "^halt$", "^hold up$"],
  },
  {
    action: "MoveBlocksDistanceToDirectionAction",
    regexes: [
      "^move\\s+(\\d+)\\s+blocks?\\s+(forward|backward|leftward|rightward|downward|upward)$",
    ],
  },
  {
    action: "MoveToObjectAction",
    regexes: ["^(?:move to|find|walk to)\\s+(?:a|an|the)\\s+(.+)$"],
  },
  {
    action: "FollowPlayerAction",
    regexes: ["^follow me$", "^come with me$"],
  },
  {
    action: "StopFollowingAction",
    regexes: ["^stop following$", "^stay there$"],
  },
  {
    action: "MoveToCoordinatesAction",
    regexes: ["^go to (-?\\d+)[, ]+(-?\\d+)[, ]+(-?\\d+)$"],
  },
  {
    action: "GoHomeAction",
    regexes: ["^go home$", "^return home$", "^go back home$"],
  },
  {
    action: "JumpAction",
    regexes: ["^jump$", "^jump up and down$"],
  },
  {
    action: "LookAtPlayerAction",
    regexes: ["^look at me$"],
  },
  {
    action: "FaceDirectionAction",
    regexes: [
      "^face (north|south|east|west)$",
      "^look to the (north|south|east|west)$",
    ],
  },
  {
    action: "TurnAroundAction",
    regexes: ["^turn around$"],
  },
  {
    action: "WanderAroundAction",
    regexes: ["^wander around$", "^go for a walk$", "^explore a bit$"],
  },
  {
    action: "BackAwayAction",
    regexes: ["^back away$", "^back off$", "^give me some space$"],
  },
  {
    action: "GoToPlayerAction",
    regexes: ["^go to player (\\w+)$"],
  },
  {
    action: "StayHereAction",
    regexes: ["^stay here$", "^wait here$", "^don't move$"],
  },
  {
    action: "AttackPlayerAction",
    regexes: ["^attack player (\\w+)$"],
  },
  {
    action: "AttackNearestMobAction",
    regexes: ["^(?:attack|kill) (?:the )?nearest ([\\w ]+)$"],
  },
  {
    action: "DefendMeAction",
    regexes: ["^defend me$", "^protect me$", "^keep me safe$"],
  },
  {
    action: "FleeAction",
    regexes: ["^run away$", "^flee$", "^retreat$"],
  },
  {
    action: "EquipItemAction",
    regexes: ["^(?:equip|hold|wield) (?:your |the |a |an )?([\\w ]+)$"],
  },
  {
    action: "EquipWeaponAction",
    regexes: [
      "^draw your (?:sword|weapon)$",
      "^equip (?:your )?weapon$",
      "^arm yourself$",
    ],
  },
  {
    action: "EquipShieldAction",
    regexes: ["^raise your shield$", "^equip (?:your )?shield$"],
  },
  {
    action: "EquipArmorAction",
    regexes: ["^put on (?:your )?armor$", "^armor up$", "^gear up$"],
  },
  {
    action: "StandDownAction",
    regexes: ["^stand down$", "^cease fire$", "^stop attacking$"],
  },
  {
    action: "HuntFoodAction",
    regexes: ["^hunt for food$", "^go hunting$"],
  },
  {
    action: "ReportThreatsAction",
    regexes: [
      "^keep watch$",
      "^any (?:mobs|threats) nearby$",
      "^report threats$",
    ],
  },
  {
    action: "ListInventoryAction",
    regexes: [
      "^list (?:your )?inventory$",
      "^what(?:'s| is) in your inventory$",
      "^show me your inventory$",
    ],
  },
  {
    action: "DropItemAction",
    regexes: ["^drop (?:your |the |a |an )?(?!all\\b)([\\w ]+)$"],
  },
  {
    action: "GiveItemToPlayerAction",
    regexes: [
      "^give me (?:a |an |the |some )?(?!space\\b)([\\w ]+)$",
      "^hand me (?:a |an |the |some )?([\\w ]+)$",
    ],
  },
  {
    action: "UnequipItemAction",
    regexes: ["^put (?:that|it) away$", "^unequip$", "^empty your hands?$"],
  },
  {
    action: "TossHeldItemAction",
    regexes: ["^toss (?:that|it)$", "^throw (?:that|it) away$"],
  },
  {
    action: "CountItemAction",
    regexes: ["^how many ([\\w ]+) do you have$"],
  },
  {
    action: "SayHeldItemAction",
    regexes: ["^what are you holding$", "^show me your hand$"],
  },
  {
    action: "SayArmorAction",
    regexes: ["^what are you wearing$", "^show me your armor$"],
  },
  {
    action: "FindItemAction",
    regexes: ["^do you have (?:a |an |any )?([\\w ]+)$"],
  },
  {
    action: "EatSpecificFoodAction",
    regexes: ["^eat (?:a|an|the|some) ([\\w ]+)$"],
  },
  {
    action: "MineBlockAction",
    regexes: [
      "^mine (?:some |a |an |the )?([\\w ]+)$",
      "^collect (?:some |a |an |the )?([\\w ]+)$",
    ],
  },
  {
    action: "MineTargetBlockAction",
    regexes: ["^(?:dig|mine|break) (?:that|this)(?: block)?$"],
  },
  {
    action: "DigDownAction",
    regexes: ["^dig down$", "^dig a hole$"],
  },
  {
    action: "CollectDropsAction",
    regexes: [
      "^pick up (?:the )?(?:items|drops)$",
      "^collect (?:the )?(?:items|drops)$",
    ],
  },
  {
    action: "ChopTreeAction",
    regexes: [
      "^chop (?:a |the |down a )?tree$",
      "^chop (?:some )?wood$",
      "^get (?:some )?wood$",
    ],
  },
  {
    action: "HarvestCropsAction",
    regexes: ["^harvest (?:the )?(?:crops|wheat|farm)$"],
  },
  {
    action: "PlantSeedsAction",
    regexes: ["^plant (?:the |some )?seeds$"],
  },
  {
    action: "TillSoilAction",
    regexes: ["^till the (?:soil|ground)$", "^hoe the ground$"],
  },
  {
    action: "OpenDoorAction",
    regexes: ["^open the door$"],
  },
  {
    action: "CloseDoorAction",
    regexes: ["^close the door$", "^shut the door$"],
  },
  {
    action: "FlipLeverAction",
    regexes: ["^(?:flip|pull|toggle) the lever$"],
  },
  {
    action: "PressButtonAction",
    regexes: ["^(?:press|push) the button$"],
  },
  {
    action: "RingBellAction",
    regexes: ["^ring the bell$"],
  },
  {
    action: "BuildPillarAction",
    regexes: ["^pillar up(?: (\\d+))?$", "^tower up(?: (\\d+))?$"],
  },
  {
    action: "PlaceBlockAction",
    regexes: ["^place (?:a |an |the )?([\\w ]+)$"],
  },
  {
    action: "PlaceCraftingTableAction",
    regexes: ["^set up a crafting table$", "^place a crafting table$"],
  },
  {
    action: "PlaceTorchAction",
    regexes: [
      "^(?:place|put) (?:a |down a )?torch$",
      "^light it up$",
      "^it(?:'s| is) too dark$",
    ],
  },
  {
    action: "CraftItemAction",
    regexes: [
      "^draft (?:a |an |some )?([\\w ]+)$",
      "^lake (?:a |an |some )?([\\w ]+)$",
    ],
  },
  {
    action: "SmeltItemAction",
    regexes: [
      "^smelt (?:the |some )?([\\w ]+)$",
      "^cook (?:the |some )?([\\w ]+)$",
    ],
  },
  {
    action: "SayChestContentsAction",
    regexes: ["^what(?:'s| is) in the chest$", "^check the chest$"],
  },
  {
    action: "DepositToChestAction",
    regexes: [
      "^(?:put|deposit|stash) your (?:items|loot|stuff) in(?:to)? the chest$",
    ],
  },
  {
    action: "WithdrawItemFromChestAction",
    regexes: [
      "^(?:take|grab|get) (?:the |some |a |an )?([\\w ]+) from the chest$",
    ],
  },
  {
    action: "EmptyChestAction",
    regexes: ["^empty the chest$", "^take everything from the chest$"],
  },
  {
    action: "MountEntityAction",
    regexes: ["^(?:ride|mount) (?:the |a |an )?([\\w ]+)$"],
  },
  {
    action: "DismountAction",
    regexes: ["^dismount$", "^get off$", "^hop off$"],
  },
  {
    action: "FishAction",
    regexes: ["^go fishing$", "^catch (?:a |some )?fish$"],
  },
  {
    action: "FeedAnimalAction",
    regexes: ["^feed the ([\\w ]+)$"],
  },
  {
    action: "BreedAnimalsAction",
    regexes: ["^breed the ([\\w ]+)$"],
  },
  {
    action: "MilkCowAction",
    regexes: ["^milk the cow$"],
  },
  {
    action: "ShearSheepAction",
    regexes: ["^shear the sheep$"],
  },
  {
    action: "CountEntitiesAction",
    regexes: ["^how many ([\\w ]+) are (?:there|around|nearby|near you)$"],
  },
  {
    action: "FindNearestEntityAction",
    regexes: ["^where is the nearest ([\\w ]+)$"],
  },
  {
    action: "ThrowEggAction",
    regexes: ["^throw an egg$"],
  },
  {
    action: "SayHealthAction",
    regexes: [
      "^how(?:'s| is) your health$",
      "^health check$",
      "^are you (?:ok|okay|hurt)$",
    ],
  },
  {
    action: "SayFoodLevelAction",
    regexes: ["^are you hungry$", "^how(?:'s| is) your (?:food|hunger)$"],
  },
  {
    action: "SayTimeAction",
    regexes: ["^what time is it$", "^is it (?:day|night)$"],
  },
  {
    action: "SayWeatherAction",
    regexes: ["^what(?:'s| is) the weather$", "^is it raining$"],
  },
  {
    action: "SayBiomeAction",
    regexes: ["^what biome (?:is this|are you in)$"],
  },
  {
    action: "ListPlayersAction",
    regexes: ["^who(?:'s| is) online$", "^list (?:the )?players$"],
  },
  {
    action: "SayDimensionAction",
    regexes: ["^what dimension$"],
  },
  {
    action: "SayVersionAction",
    regexes: ["^what version$"],
  },
  {
    action: "SayLatestActionAction",
    regexes: ["^what are you doing$", "^status report$"],
  },
  {
    action: "SayActionCountAction",
    regexes: ["^what have you been up to$", "^how busy have you been$"],
  },
  {
    action: "SayExperienceAction",
    regexes: ["^what level are you$", "^how much (?:xp|experience)$"],
  },
  {
    action: "SayLightLevelAction",
    regexes: ["^how dark is it$", "^what(?:'s| is) the light level$"],
  },
  {
    action: "SayElevationAction",
    regexes: [
      "^how high (?:up )?are you$",
      "^what(?:'s| is) your (?:altitude|elevation)$",
    ],
  },
  {
    action: "SayDistanceToPlayerAction",
    regexes: ["^how far (?:away )?am i$"],
  },
  {
    action: "SayNearestPlayerAction",
    regexes: ["^who(?:'s| is) (?:closest|nearest) to you$"],
  },
  {
    action: "SayUptimeAction",
    regexes: [
      "^how long have you been (?:online|running)$",
      "^what(?:'s| is) your uptime$",
    ],
  },
  {
    action: "GreetAction",
    regexes: ["^(?:hello|hi|hey|howdy)$"],
  },
  {
    action: "FarewellAction",
    regexes: ["^(?:bye|goodbye|farewell|see (?:ya|you))$"],
  },
  {
    action: "ThankYouResponseAction",
    regexes: ["^thank(?:s| you)$"],
  },
  {
    action: "TellJokeAction",
    regexes: ["^tell (?:me |us )?a joke$"],
  },
  {
    action: "TellFactAction",
    regexes: ["^tell (?:me |us )?a (?:fun )?fact$"],
  },
  {
    action: "SingSongAction",
    regexes: ["^sing (?:me |us )?a song$", "^sing something$"],
  },
  {
    action: "DanceAction",
    regexes: ["^dance$", "^show me your moves$"],
  },
  {
    action: "WaveAction",
    regexes: ["^wave$", "^say hi with your hand$"],
  },
  {
    action: "NodAction",
    regexes: ["^nod$"],
  },
  {
    action: "ShakeHeadAction",
    regexes: ["^shake your head$"],
  },
  {
    action: "SneakAction",
    regexes: ["^sneak$", "^crouch$"],
  },
  {
    action: "StandUpAction",
    regexes: ["^stand up$", "^stop (?:sneaking|crouching)$"],
  },
  {
    action: "SprintAction",
    regexes: ["^sprint$", "^run forward$"],
  },
  {
    action: "CoinFlipAction",
    regexes: ["^flip a coin$", "^heads or tails$"],
  },
  {
    action: "RollDiceAction",
    regexes: ["^roll (?:a |the )?(?:die|dice)$", "^roll a d(\\d+)$"],
  },
  {
    action: "CountdownAction",
    regexes: ["^count ?down from (\\d+)$"],
  },
  {
    action: "ComplimentPlayerAction",
    regexes: ["^say something nice$", "^compliment me$"],
  },
  {
    action: "WhisperSecretAction",
    regexes: ["^tell me a secret$"],
  },
];

class RespondToMessageAction extends BaseAction {
  getId() {
    return this.constructor.name;
  }

  async do(opts) {
    const message = opts.message;
    const sender = opts.sender;

    let action;
    let messageElems;
    let status;

    bag.logStepHeading(`Responding to message...`);

    for (const messageConfig of MESSAGE_MAPPING) {
      for (const messageRegex of messageConfig.regexes) {
        const regexResult = message
          .toLowerCase()
          .match(new RegExp(messageRegex));

        if (regexResult) {
          bag.logStepItemSuccess(
            `Found matching action: ${messageConfig.action}, for message: ${message}, from sender: ${sender}`,
          );
          action = eval(`new ${messageConfig.action}(this.npc)`);
          messageElems = regexResult;
        }
      }
    }

    if (action) {
      await action.do({
        message: message,
        messageElems: messageElems,
        player: sender,
      });
      status = "success";
    } else {
      bag.logStepItemSuccess(
        `Forwarding to ChatGPT message: ${message}, from sender: ${sender}`,
      );
      await new ForwardToChatGptAction(this.npc).do({
        message: message,
        player: sender,
      });
      status = "success";
    }

    this.registerInfo(status);
  }
}

export { RespondToMessageAction as default };
