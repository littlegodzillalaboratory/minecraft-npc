"use strict";
import fs from "node:fs";

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

const ACTIONS = {
  EatAction,
  EmptyInventoryAction,
  SayCurrentLocationAction,
  GuardCurrentLocationAction,
  MoveToPlayerLocationAction,
  SleepAction,
  StopCurrentAction,
  MoveBlocksDistanceToDirectionAction,
  MoveToObjectAction,
  FollowPlayerAction,
  StopFollowingAction,
  MoveToCoordinatesAction,
  GoHomeAction,
  JumpAction,
  LookAtPlayerAction,
  FaceDirectionAction,
  TurnAroundAction,
  WanderAroundAction,
  BackAwayAction,
  GoToPlayerAction,
  StayHereAction,
  AttackPlayerAction,
  AttackNearestMobAction,
  DefendMeAction,
  FleeAction,
  EquipItemAction,
  EquipWeaponAction,
  EquipShieldAction,
  EquipArmorAction,
  StandDownAction,
  HuntFoodAction,
  ReportThreatsAction,
  ListInventoryAction,
  DropItemAction,
  GiveItemToPlayerAction,
  UnequipItemAction,
  TossHeldItemAction,
  CountItemAction,
  SayHeldItemAction,
  SayArmorAction,
  FindItemAction,
  EatSpecificFoodAction,
  MineBlockAction,
  MineTargetBlockAction,
  DigDownAction,
  CollectDropsAction,
  ChopTreeAction,
  HarvestCropsAction,
  PlantSeedsAction,
  TillSoilAction,
  OpenDoorAction,
  CloseDoorAction,
  FlipLeverAction,
  PressButtonAction,
  RingBellAction,
  BuildPillarAction,
  PlaceBlockAction,
  PlaceCraftingTableAction,
  PlaceTorchAction,
  CraftItemAction,
  SmeltItemAction,
  SayChestContentsAction,
  DepositToChestAction,
  WithdrawItemFromChestAction,
  EmptyChestAction,
  MountEntityAction,
  DismountAction,
  FishAction,
  FeedAnimalAction,
  BreedAnimalsAction,
  MilkCowAction,
  ShearSheepAction,
  CountEntitiesAction,
  FindNearestEntityAction,
  ThrowEggAction,
  SayHealthAction,
  SayFoodLevelAction,
  SayTimeAction,
  SayWeatherAction,
  SayBiomeAction,
  ListPlayersAction,
  SayDimensionAction,
  SayVersionAction,
  SayLatestActionAction,
  SayActionCountAction,
  SayExperienceAction,
  SayLightLevelAction,
  SayElevationAction,
  SayDistanceToPlayerAction,
  SayNearestPlayerAction,
  SayUptimeAction,
  GreetAction,
  FarewellAction,
  ThankYouResponseAction,
  TellJokeAction,
  TellFactAction,
  SingSongAction,
  DanceAction,
  WaveAction,
  NodAction,
  ShakeHeadAction,
  SneakAction,
  StandUpAction,
  SprintAction,
  CoinFlipAction,
  RollDiceAction,
  CountdownAction,
  ComplimentPlayerAction,
  WhisperSecretAction,
};

/**
 * Message patterns are data so commands can be adjusted without editing the
 * action dispatcher. Resolve the path relative to this module so it also works
 * from a globally installed npm package.
 */
const MESSAGE_MAPPING = JSON.parse(
  fs.readFileSync(
    new URL("../../conf/respond-to-message.json", import.meta.url),
    "utf8",
  ),
);

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
          const Action = ACTIONS[messageConfig.action];
          action = new Action(this.npc);
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
