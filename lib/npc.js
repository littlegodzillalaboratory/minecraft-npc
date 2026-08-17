"use strict";
import bag from "bagofcli";
import v from "./validator.js";
import EatSkill from "./skills/eat.js";
import EmptyInventorySkill from "./skills/empty-inventory.js";
import GuardLocationSkill from "./skills/guard-location.js";
import MessageChatGptSkill from "./skills/message-chatgpt.js";
import MoveToLocationSkill from "./skills/move-to-location.js";
import MoveBlocksDistanceToDirectionSkill from "./skills/move-blocks-distance-to-direction.js";
import MoveToObjectSkill from "./skills/move-to-object.js";
import SayMessageSkill from "./skills/say-message.js";
import SleepSkill from "./skills/sleep.js";
import StopSkill from "./skills/stop.js";
import FollowPlayerSkill from "./skills/follow-player.js";
import JumpSkill from "./skills/jump.js";
import LookAtLocationSkill from "./skills/look-at-location.js";
import FaceDirectionSkill from "./skills/face-direction.js";
import WanderSkill from "./skills/wander.js";
import AttackPlayerSkill from "./skills/attack-player.js";
import AttackNearestEntitySkill from "./skills/attack-nearest-entity.js";
import HuntFoodSkill from "./skills/hunt-food.js";
import DefendPlayerSkill from "./skills/defend-player.js";
import FleeSkill from "./skills/flee.js";
import EquipItemSkill from "./skills/equip-item.js";
import EquipArmorSkill from "./skills/equip-armor.js";
import UnequipItemSkill from "./skills/unequip-item.js";
import DropItemSkill from "./skills/drop-item.js";
import TossHeldItemSkill from "./skills/toss-held-item.js";
import GiveItemSkill from "./skills/give-item.js";
import EatFoodSkill from "./skills/eat-food.js";
import CollectItemsSkill from "./skills/collect-items.js";
import DigBlockSkill from "./skills/dig-block.js";
import PlaceBlockSkill from "./skills/place-block.js";
import CollectBlockSkill from "./skills/collect-block.js";
import HarvestCropsSkill from "./skills/harvest-crops.js";
import PlantSeedsSkill from "./skills/plant-seeds.js";
import TillSoilSkill from "./skills/till-soil.js";
import ActivateBlockSkill from "./skills/activate-block.js";
import BuildPillarSkill from "./skills/build-pillar.js";
import CraftItemSkill from "./skills/craft-item.js";
import SmeltItemSkill from "./skills/smelt-item.js";
import ListChestSkill from "./skills/list-chest.js";
import DepositToChestSkill from "./skills/deposit-to-chest.js";
import WithdrawFromChestSkill from "./skills/withdraw-from-chest.js";
import MountEntitySkill from "./skills/mount-entity.js";
import DismountSkill from "./skills/dismount.js";
import FishSkill from "./skills/fish.js";
import UseItemOnEntitySkill from "./skills/use-item-on-entity.js";
import FeedAnimalSkill from "./skills/feed-animal.js";
import BreedAnimalsSkill from "./skills/breed-animals.js";
import ActivateItemSkill from "./skills/activate-item.js";
import SneakSkill from "./skills/sneak.js";
import SprintSkill from "./skills/sprint.js";
import SwingArmSkill from "./skills/swing-arm.js";
import DanceSkill from "./skills/dance.js";
import GestureSkill from "./skills/gesture.js";
import WhisperSkill from "./skills/whisper.js";

class Npc {
  constructor(bot, register, opts) {
    this.bot = bot;
    this.register = register;
    this.opts = opts;
  }

  getBot() {
    return this.bot;
  }

  getRegister() {
    return this.register;
  }

  getOpts() {
    return this.opts;
  }

  getPosition() {
    return this.bot.entity.position;
  }

  getPlayerPosition(player) {
    return this.bot.players[player].entity.position;
  }

  eat() {
    const skill = new EatSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is eating`;
    const failureMessage = `Unable to eat`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  emptyInventory() {
    const skill = new EmptyInventorySkill(this.bot);
    const opts = {};
    const validation = () => true; // Always valid to empty inventory
    const successMessage = `${this.bot.username} is emptying inventory`;
    const failureMessage = `Unable to empty inventory`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  guardLocation(posX, posY, posZ) {
    this.moveToLocation(posX, posY, posZ);

    const skill = new GuardLocationSkill(this.bot);
    const opts = { posX: posX, posY: posY, posZ: posZ };
    const validation = () => v.isValidCoord(posX, posY, posZ);
    const successMessage = `${this.bot.username} is guarding location: ${posX} ${posY} ${posZ}`;
    const failureMessage = `Unable to guard invalid location: ${posX} ${posY} ${posZ}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  messageChatGpt(player, message) {
    const skill = new MessageChatGptSkill(this.bot);
    const opts = { message: message };
    const validation = () => v.isValidMessage(player, message);
    const successMessage = `${this.bot.username} is sending ChatGPT message: ${message}`;
    const failureMessage = `Unable to send invalid message: ${message}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  moveToLocation(posX, posY, posZ) {
    const skill = new MoveToLocationSkill(this.bot);
    const opts = { posX: posX, posY: posY, posZ: posZ };
    const validation = () => v.isValidCoord(posX, posY, posZ);
    const successMessage = `${this.bot.username} is moving to location: ${posX} ${posY} ${posZ}`;
    const failureMessage = `Unable to move ${this.bot.username} to invalid location: ${posX} ${posY} ${posZ}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  moveToObject(objectName) {
    const skill = new MoveToObjectSkill(this.bot);
    const opts = { objectName: objectName };
    const validation = () => v.isValidMessage(objectName);
    const successMessage = `${this.bot.username} is moving to object: ${objectName}`;
    const failureMessage = `Unable to move ${this.bot.username} to invalid object: ${objectName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  moveBlocksDistanceToDirection(distance, direction) {
    const skill = new MoveBlocksDistanceToDirectionSkill(this.bot);
    const opts = { distance: distance, direction: direction };
    const validation = () => v.isValidMoveDirection(distance, direction);
    const successMessage = `${this.bot.username} is moving ${distance} blocks ${direction}`;
    const failureMessage = `Unable to move ${this.bot.username} ${distance} blocks ${direction}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  sayMessage(message) {
    const skill = new SayMessageSkill(this.bot);
    const opts = { message: message };
    const validation = () => v.isValidMessage(message);
    const successMessage = `${this.bot.username} is saying message: ${message}`;
    const failureMessage = `Unable to say invalid message: ${message}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  sleep() {
    const skill = new SleepSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is going to sleep`;
    const failureMessage = `Unable to sleep`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  stop() {
    const skill = new StopSkill(this.bot);
    const opts = {};
    const validation = () => true; // Always valid to stop current bot activity
    const successMessage = `${this.bot.username} is stopping current activity`;
    const failureMessage = `Unable to stop current activity`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  followPlayer(player) {
    const skill = new FollowPlayerSkill(this.bot);
    const opts = { player: player };
    const validation = () => v.isValidMessage(player);
    const successMessage = `${this.bot.username} is following ${player}`;
    const failureMessage = `Unable to follow invalid player: ${player}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  jump() {
    const skill = new JumpSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is jumping`;
    const failureMessage = `Unable to jump`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  lookAtLocation(posX, posY, posZ) {
    const skill = new LookAtLocationSkill(this.bot);
    const opts = { posX: posX, posY: posY, posZ: posZ };
    const validation = () => v.isValidCoord(posX, posY, posZ);
    const successMessage = `${this.bot.username} is looking at location: ${posX} ${posY} ${posZ}`;
    const failureMessage = `Unable to look at invalid location: ${posX} ${posY} ${posZ}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  faceDirection(direction) {
    const skill = new FaceDirectionSkill(this.bot);
    const opts = { direction: direction };
    const validation = () => v.isValidFaceDirection(direction);
    const successMessage = `${this.bot.username} is facing ${direction}`;
    const failureMessage = `Unable to face invalid direction: ${direction}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  wander() {
    const skill = new WanderSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is wandering around`;
    const failureMessage = `Unable to wander around`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  attackPlayer(player) {
    const skill = new AttackPlayerSkill(this.bot);
    const opts = { player: player };
    const validation = () => v.isValidMessage(player);
    const successMessage = `${this.bot.username} is attacking player: ${player}`;
    const failureMessage = `Unable to attack invalid player: ${player}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  attackNearestEntity(entityName) {
    const skill = new AttackNearestEntitySkill(this.bot);
    const opts = { entityName: entityName };
    const validation = () => v.isValidMessage(entityName);
    const successMessage = `${this.bot.username} is attacking nearest: ${entityName}`;
    const failureMessage = `Unable to attack invalid entity: ${entityName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  huntFood() {
    const skill = new HuntFoodSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is hunting for food`;
    const failureMessage = `Unable to hunt for food`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  defendPlayer(player) {
    const skill = new DefendPlayerSkill(this.bot);
    const opts = { player: player };
    const validation = () => v.isValidMessage(player);
    const successMessage = `${this.bot.username} is defending player: ${player}`;
    const failureMessage = `Unable to defend invalid player: ${player}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  flee() {
    const skill = new FleeSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is fleeing`;
    const failureMessage = `Unable to flee`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  equipItem(itemName, destination) {
    const skill = new EquipItemSkill(this.bot);
    const opts = { itemName: itemName, destination: destination };
    const validation = () =>
      v.isValidMessage(itemName) && v.isValidEquipDestination(destination);
    const successMessage = `${this.bot.username} is equipping ${itemName} to ${destination}`;
    const failureMessage = `Unable to equip invalid item: ${itemName} to ${destination}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  equipArmor() {
    const skill = new EquipArmorSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is equipping armor`;
    const failureMessage = `Unable to equip armor`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  unequipItem() {
    const skill = new UnequipItemSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is unequipping held item`;
    const failureMessage = `Unable to unequip held item`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  dropItem(itemName) {
    const skill = new DropItemSkill(this.bot);
    const opts = { itemName: itemName };
    const validation = () => v.isValidMessage(itemName);
    const successMessage = `${this.bot.username} is dropping item: ${itemName}`;
    const failureMessage = `Unable to drop invalid item: ${itemName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  tossHeldItem() {
    const skill = new TossHeldItemSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is tossing held item`;
    const failureMessage = `Unable to toss held item`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  giveItem(player, itemName) {
    const skill = new GiveItemSkill(this.bot);
    const opts = { player: player, itemName: itemName };
    const validation = () =>
      v.isValidMessage(player) && v.isValidMessage(itemName);
    const successMessage = `${this.bot.username} is giving ${itemName} to ${player}`;
    const failureMessage = `Unable to give invalid item: ${itemName} to ${player}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  eatFood(itemName) {
    const skill = new EatFoodSkill(this.bot);
    const opts = { itemName: itemName };
    const validation = () => v.isValidMessage(itemName);
    const successMessage = `${this.bot.username} is eating ${itemName}`;
    const failureMessage = `Unable to eat invalid food: ${itemName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  collectItems() {
    const skill = new CollectItemsSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is collecting dropped items`;
    const failureMessage = `Unable to collect dropped items`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  digBlock(target) {
    const skill = new DigBlockSkill(this.bot);
    const opts = { target: target };
    const validation = () => v.isValidDigTarget(target);
    const successMessage = `${this.bot.username} is digging block: ${target}`;
    const failureMessage = `Unable to dig invalid target: ${target}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  placeBlock(itemName) {
    const skill = new PlaceBlockSkill(this.bot);
    const opts = { itemName: itemName };
    const validation = () => v.isValidMessage(itemName);
    const successMessage = `${this.bot.username} is placing block: ${itemName}`;
    const failureMessage = `Unable to place invalid block: ${itemName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  collectBlock(blockName) {
    const skill = new CollectBlockSkill(this.bot);
    const opts = { blockName: blockName };
    const validation = () => v.isValidMessage(blockName);
    const successMessage = `${this.bot.username} is collecting block: ${blockName}`;
    const failureMessage = `Unable to collect invalid block: ${blockName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  harvestCrops() {
    const skill = new HarvestCropsSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is harvesting crops`;
    const failureMessage = `Unable to harvest crops`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  plantSeeds() {
    const skill = new PlantSeedsSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is planting seeds`;
    const failureMessage = `Unable to plant seeds`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  tillSoil() {
    const skill = new TillSoilSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is tilling soil`;
    const failureMessage = `Unable to till soil`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  activateBlock(blockName) {
    const skill = new ActivateBlockSkill(this.bot);
    const opts = { blockName: blockName };
    const validation = () => v.isValidMessage(blockName);
    const successMessage = `${this.bot.username} is activating block: ${blockName}`;
    const failureMessage = `Unable to activate invalid block: ${blockName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  buildPillar(height) {
    const skill = new BuildPillarSkill(this.bot);
    const opts = { height: height };
    const validation = () => v.isValidPositiveInteger(height);
    const successMessage = `${this.bot.username} is building a pillar of height: ${height}`;
    const failureMessage = `Unable to build pillar with invalid height: ${height}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  craftItem(itemName) {
    const skill = new CraftItemSkill(this.bot);
    const opts = { itemName: itemName };
    const validation = () => v.isValidMessage(itemName);
    const successMessage = `${this.bot.username} is crafting: ${itemName}`;
    const failureMessage = `Unable to craft invalid item: ${itemName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  smeltItem(itemName) {
    const skill = new SmeltItemSkill(this.bot);
    const opts = { itemName: itemName };
    const validation = () => v.isValidMessage(itemName);
    const successMessage = `${this.bot.username} is smelting: ${itemName}`;
    const failureMessage = `Unable to smelt invalid item: ${itemName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  listChest() {
    const skill = new ListChestSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is listing chest contents`;
    const failureMessage = `Unable to list chest contents`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  depositToChest() {
    const skill = new DepositToChestSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is depositing items into chest`;
    const failureMessage = `Unable to deposit items into chest`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  withdrawFromChest(itemName) {
    const skill = new WithdrawFromChestSkill(this.bot);
    const opts = { itemName: itemName };
    const validation = () => v.isValidMessage(itemName);
    const successMessage = `${this.bot.username} is withdrawing ${itemName} from chest`;
    const failureMessage = `Unable to withdraw invalid item: ${itemName} from chest`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  withdrawAllFromChest() {
    const skill = new WithdrawFromChestSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is withdrawing all items from chest`;
    const failureMessage = `Unable to withdraw all items from chest`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  mountEntity(entityName) {
    const skill = new MountEntitySkill(this.bot);
    const opts = { entityName: entityName };
    const validation = () => v.isValidMessage(entityName);
    const successMessage = `${this.bot.username} is mounting: ${entityName}`;
    const failureMessage = `Unable to mount invalid entity: ${entityName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  dismount() {
    const skill = new DismountSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is dismounting`;
    const failureMessage = `Unable to dismount`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  fish() {
    const skill = new FishSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is fishing`;
    const failureMessage = `Unable to fish`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  useItemOnEntity(itemName, entityName) {
    const skill = new UseItemOnEntitySkill(this.bot);
    const opts = { itemName: itemName, entityName: entityName };
    const validation = () =>
      v.isValidMessage(itemName) && v.isValidMessage(entityName);
    const successMessage = `${this.bot.username} is using ${itemName} on ${entityName}`;
    const failureMessage = `Unable to use invalid item: ${itemName} on ${entityName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  feedAnimal(entityName) {
    const skill = new FeedAnimalSkill(this.bot);
    const opts = { entityName: entityName };
    const validation = () => v.isValidMessage(entityName);
    const successMessage = `${this.bot.username} is feeding: ${entityName}`;
    const failureMessage = `Unable to feed invalid animal: ${entityName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  breedAnimals(entityName) {
    const skill = new BreedAnimalsSkill(this.bot);
    const opts = { entityName: entityName };
    const validation = () => v.isValidMessage(entityName);
    const successMessage = `${this.bot.username} is breeding: ${entityName}`;
    const failureMessage = `Unable to breed invalid animals: ${entityName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  activateItem(itemName) {
    const skill = new ActivateItemSkill(this.bot);
    const opts = { itemName: itemName };
    const validation = () => v.isValidMessage(itemName);
    const successMessage = `${this.bot.username} is activating item: ${itemName}`;
    const failureMessage = `Unable to activate invalid item: ${itemName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  sneak(enable) {
    const skill = new SneakSkill(this.bot);
    const opts = { enable: enable };
    const validation = () => v.isValidBoolean(enable);
    const successMessage = `${this.bot.username} is setting sneak to ${enable}`;
    const failureMessage = `Unable to set sneak to invalid value: ${enable}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  sprint() {
    const skill = new SprintSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is sprinting`;
    const failureMessage = `Unable to sprint`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  swingArm() {
    const skill = new SwingArmSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is swinging arm`;
    const failureMessage = `Unable to swing arm`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  dance() {
    const skill = new DanceSkill(this.bot);
    const opts = {};
    const validation = () => true;
    const successMessage = `${this.bot.username} is dancing`;
    const failureMessage = `Unable to dance`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  gesture(gestureName) {
    const skill = new GestureSkill(this.bot);
    const opts = { gestureName: gestureName };
    const validation = () => v.isValidGesture(gestureName);
    const successMessage = `${this.bot.username} is gesturing: ${gestureName}`;
    const failureMessage = `Unable to gesture invalid gesture: ${gestureName}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  whisper(player, message) {
    const skill = new WhisperSkill(this.bot);
    const opts = { player: player, message: message };
    const validation = () =>
      v.isValidMessage(player) && v.isValidMessage(message);
    const successMessage = `${this.bot.username} is whispering to ${player}`;
    const failureMessage = `Unable to whisper invalid message to ${player}`;

    return this._doSkill(
      skill,
      opts,
      validation,
      successMessage,
      failureMessage,
    );
  }

  _doSkill(skill, opts, validation, successMessage, failureMessage) {
    let status;

    if (validation()) {
      skill.do(opts);
      bag.logStepItemSuccess(successMessage);
      status = "success";
    } else {
      bag.logStepItemError(failureMessage);
      status = "failed";
    }

    return status;
  }
}

export { Npc as default };
