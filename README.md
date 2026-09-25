<!-- BEGIN:AVATAR -->
![Avatar](avatar.jpg)
<!-- END:AVATAR -->

<!-- BEGIN:BADGES -->
[![Build Status](https://github.com/littlegodzillalaboratory/minecraft-npc/workflows/CI/badge.svg)](https://github.com/littlegodzillalaboratory/minecraft-npc/actions?query=workflow%3ACI)
[![Dependencies Status](https://img.shields.io/librariesio/release/npm/minecraft-npc)](https://libraries.io/npm/minecraft-npc)
[![Code Scanning Status](https://github.com/littlegodzillalaboratory/minecraft-npc/workflows/CodeQL/badge.svg)](https://github.com/littlegodzillalaboratory/minecraft-npc/actions?query=workflow%3ACodeQL)
[![Coverage Status](https://coveralls.io/repos/github/littlegodzillalaboratory/minecraft-npc/badge.svg?branch=main)](https://coveralls.io/r/littlegodzillalaboratory/minecraft-npc?branch=main)
[![Security Status](https://snyk.io/test/github/littlegodzillalaboratory/minecraft-npc/badge.svg)](https://snyk.io/test/github/littlegodzillalaboratory/minecraft-npc)
[![Published Version](https://img.shields.io/npm/v/minecraft-npc.svg)](https://www.npmjs.com/package/minecraft-npc)
<!-- END:BADGES -->

# Minecraft NPC

Minecraft NPC is a CLI for running NPC bot on Minecraft, powered by [Mineflayer](https://prismarinejs.github.io/mineflayer/#/).

![Bob logs screenshot](docs/images/bob-logs.png "Bob logs screenshot")

## Installation

```shell
npm install -g minecraft-npc
```

## Usage

Create a configuration file, e.g. `minecraft-npc.yaml`

Start Minecraft NPC bot:

```shell
minecraft-npc start --conf-file minecraft-npc.yaml
```

## Configuration

| Property | Description | Mandatory/Optional | Default Value |
|----------|-------------|--------------------|---------------|
| host | Minecraft server host | Optional | `localhost` |
| port | Minecraft server port | Optional | `25565` |
| version | Minecraft version | Mandatory | |
| viewer_port | Minecraft viewer port | Optional | `3000` |
| web_inventory_port | Minecraft web inventory port | Mandatory | |
| username | Minecraft username | Optional | `bob` |
| password | Minecraft password | Optional, only needed on online mode | |
| init_coords | Initial bot coordinates [x, y, z] | Optional | `[0, 0, 0]` |
| init_messages | Initial bot messages to send on spawn | Optional | |
| chatgpt_message_apikey | ChatGPT message API key, used for chat completions. Can also be set via `CHATGPT_MESSAGE_API_KEY` environment variable. Can be any placeholder value when `chatgpt_message_base_url` points at a local LLM server that doesn't require authentication | Optional, only needed for ChatGPT chat feature | |
| chatgpt_moderation_apikey | ChatGPT moderation API key, used for OpenAI's moderation endpoint. Can also be set via `CHATGPT_MODERATION_API_KEY` environment variable | Optional, only needed when `chatgpt_enable_moderation` is `true` | |
| chatgpt_message_base_url | Base URL of the chat completion endpoint. Set this to use a local OpenAI-compatible LLM server (e.g. vMLX) instead of OpenAI | Optional | OpenAI's default base URL |
| chatgpt_model | [ChatGPT model](https://developers.openai.com/api/docs/models/all) to use | Optional | `gpt-5.6`  |
| chatgpt_instructions | ChatGPT bot instructions | Optional | |
| chatgpt_enable_security_instructions | Append security instructions to the base instructions for hardening the model against prompt injection and other LLM threats | Optional | `true` |
| chatgpt_enable_moderation | Enable ChatGPT moderation of messages | Optional | `false` |
| chatgpt_enable_message_logging | Enable logging of ChatGPT messages | Optional | `false` |
| chatgpt_minimum_reply_confidence_score | Minimum self-reported confidence score accepted for ChatGPT replies | Optional | |
| chatgpt_minimum_jailbreak_confidence_score | Minimum OpenAI Guardrails confidence required to classify a message as a jailbreak attempt | Optional | `0.7` |
| chatgpt_cool_down_in_seconds | Cool-down period in seconds between ChatGPT responses | Optional | |
| chatgpt_fallback_message | Message to send when ChatGPT cannot provide a response | Optional | |
| auto_mode_enabled | Enable deterministic autonomous survival behaviour after spawning | Optional | `false` |
| auto_mode_engine | Policy engine selected when auto-mode starts | Optional | `homesteader` |
| auto_mode_evaluation_interval_in_seconds | Seconds between autonomous policy evaluations | Optional | `2` |
| auto_mode_hunger_threshold | Food level at or below which the NPC eats | Optional | `14` |
| auto_mode_minimum_food_reserve | Minimum inventory food count before the NPC hunts | Optional | `12` |
| auto_mode_flee_health_threshold | Health at or below which the NPC flees nearby threats | Optional | `8` |
| auto_mode_allowed_hunt_animals | Animal names that autonomous hunting may target | Optional | `[cow, pig, chicken, sheep, rabbit]` |
| auto_mode_maximum_hunting_distance | Maximum distance to an autonomous hunting target | Optional | `64` |
| auto_mode_threat_radius | Radius used to detect hostile mobs | Optional | `16` |
| auto_mode_home_radius | Maximum distance from `init_coords` at which the NPC is considered home | Optional | `3` |
| auto_mode_sleep_retry_cooldown_in_seconds | Seconds to wait before retrying a failed sleep attempt | Optional | `30` |

## Commands

Commands are matched case-insensitively after the NPC's username prefix is removed. The patterns below are the configured regular expressions; captured values supply action parameters.

| Command | Description | Action | Skill | Note |
|---------|-------------|--------|-------|------|
| `^enable auto mode(?: as ([a-z][a-z0-9-]*))?$`; `^start auto mode(?: as ([a-z][a-z0-9-]*))?$`; `^be autonomous(?: as ([a-z][a-z0-9-]*))?$` | Enables autonomous mode using the requested policy engine. | `EnableAutoModeAction` | — | Defaults to `homesteader`; the engine must be registered. |
| `^disable auto mode$`; `^stop auto mode$` | Disables autonomous mode and stops its current activity. | `DisableAutoModeAction` | — | Stops the active engine and its movement. |
| `^auto mode status$`; `^what is your autonomous goal$` | Reports the active auto-mode engine, goal, and state. | `SayAutoModeStatusAction` | `SayMessageSkill` | — |
| `^eat$`; `^eat something$`; `^eat food$`; `^i am hungry$`; `^i'm hungry$` | Makes the NPC eat. | `EatAction` | `EatSkill` | — |
| `^empty inventory$`; `^drop all items$`; `^clear inventory$` | Makes the NPC empty inventory. | `EmptyInventoryAction` | `EmptyInventorySkill` | — |
| `^what is your location\?$`; `^send location$` | Reports the NPC's current coordinates. | `SayCurrentLocationAction` | `SayMessageSkill` | — |
| `^guard the area$`; `^defend the area$`; `^stand your ground$` | Makes the NPC guard current location. | `GuardCurrentLocationAction` | `GuardLocationSkill` | Continuous until stopped; guards within a 30-block radius. |
| `^come here$`; `^get over here$` | Moves to the commanding player's position. | `MoveToPlayerLocationAction` | `GetPlayerPositionSkill`, `MoveToLocationSkill` | The commanding player must be visible. |
| `^go to sleep$`; `^time to sleep$`; `^sleep$` | Makes the NPC sleep. | `SleepAction` | `SleepSkill` | Requires a nearby usable bed and a valid sleeping time or thunderstorm. |
| `^stop$`; `^halt$`; `^hold up$` | Stops current movement, combat, and continuous activities. | `StopCurrentAction` | `StopSkill` | — |
| `^move\s+(\d+)\s+blocks?\s+(forward\|backward\|leftward\|rightward\|downward\|upward)$` | Moves the requested distance in a relative direction. | `MoveBlocksDistanceToDirectionAction` | `MoveBlocksDistanceToDirectionSkill` | — |
| `^(?:move to\|find\|walk to)\s+(?:a\|an\|the)\s+(.+)$` | Finds a nearby object and moves to it. | `MoveToObjectAction` | `MoveToObjectSkill`, `MoveToLocationSkill` | — |
| `^follow me$`; `^come with me$` | Makes the NPC follow player. | `FollowPlayerAction` | `FollowPlayerSkill` | Continuous until stopped; the commanding player must be visible. |
| `^stop following$`; `^stay there$` | Stops following and other current movement. | `StopFollowingAction` | `StopSkill` | — |
| `^go to (-?\d+)[, ]+(-?\d+)[, ]+(-?\d+)$` | Makes the NPC move to coordinates. | `MoveToCoordinatesAction` | `MoveToLocationSkill` | — |
| `^go home$`; `^return home$`; `^go back home$` | Returns to the configured initial coordinates. | `GoHomeAction` | `MoveToLocationSkill` | Home is `init_coords`. |
| `^jump$`; `^jump up and down$` | Makes the NPC jump. | `JumpAction` | `JumpSkill` | — |
| `^look at me$` | Turns to look at the commanding player. | `LookAtPlayerAction` | `GetPlayerPositionSkill`, `LookAtLocationSkill`, `SayMessageSkill` | The commanding player must be visible. |
| `^face (north\|south\|east\|west)$`; `^look to the (north\|south\|east\|west)$` | Makes the NPC face direction. | `FaceDirectionAction` | `FaceDirectionSkill` | — |
| `^turn around$` | Turns to face the opposite direction. | `TurnAroundAction` | `FaceDirectionSkill` | — |
| `^wander around$`; `^go for a walk$`; `^explore a bit$` | Makes the NPC wander around. | `WanderAroundAction` | `WanderSkill`, `MoveToLocationSkill` | — |
| `^back away$`; `^back off$`; `^give me some space$` | Moves away from the current facing direction. | `BackAwayAction` | `MoveBlocksDistanceToDirectionSkill` | — |
| `^go to player (\w+)$` | Finds a named player and moves to them. | `GoToPlayerAction` | `GetPlayerPositionSkill`, `MoveToLocationSkill`, `SayMessageSkill` | The named player must be visible. |
| `^stay here$`; `^wait here$`; `^don't move$` | Stops current movement and remains in place. | `StayHereAction` | `StopSkill` | — |
| `^attack player (\w+)$` | Makes the NPC attack player. | `AttackPlayerAction` | `AttackPlayerSkill` | The named player must be visible. |
| `^(?:attack\|kill) (?:the )?nearest ([\w ]+)$` | Attacks the nearest matching entity. | `AttackNearestMobAction` | `AttackNearestEntitySkill` | — |
| `^defend me$`; `^protect me$`; `^keep me safe$` | Attacks a hostile mob threatening the commanding player. | `DefendMeAction` | `DefendPlayerSkill` | Only attacks entities classified as hostile mobs. |
| `^run away$`; `^flee$`; `^retreat$` | Finds an escape destination away from the nearest threat. | `FleeAction` | `FleeSkill`, `MoveToLocationSkill` | Requires a nearby hostile mob. |
| `^(?:equip\|hold\|wield) (?:your \|the \|a \|an )?([\w ]+)$` | Makes the NPC equip item. | `EquipItemAction` | `EquipItemSkill` | — |
| `^draw your (?:sword\|weapon)$`; `^equip (?:your )?weapon$`; `^arm yourself$` | Equips an available weapon. | `EquipWeaponAction` | `EquipItemSkill` | Uses the first available sword or axe. |
| `^raise your shield$`; `^equip (?:your )?shield$` | Equips an available shield. | `EquipShieldAction` | `EquipItemSkill` | Requires a shield in inventory. |
| `^put on (?:your )?armor$`; `^armor up$`; `^gear up$` | Makes the NPC equip armor. | `EquipArmorAction` | `EquipArmorSkill` | — |
| `^stand down$`; `^cease fire$`; `^stop attacking$` | Stops combat and other current activities. | `StandDownAction` | `StopSkill` | — |
| `^hunt for food$`; `^go hunting$` | Hunts an allowed nearby animal for food. | `HuntFoodAction` | `HuntFoodSkill` | Limited by the configured animal allow-list and maximum distance. |
| `^keep watch$`; `^any (?:mobs\|threats) nearby$`; `^report threats$` | Reports hostile mobs within the configured radius. | `ReportThreatsAction` | `FindNearbyThreatsSkill`, `SayMessageSkill` | — |
| `^list (?:your )?inventory$`; `^what(?:'s\| is) in your inventory$`; `^show me your inventory$` | Reports the contents of the NPC's inventory. | `ListInventoryAction` | `GetInventorySummarySkill`, `SayMessageSkill` | — |
| `^drop (?:your \|the \|a \|an )?(?!all\b)([\w ]+)$` | Makes the NPC drop item. | `DropItemAction` | `DropItemSkill` | — |
| `^give me (?:a \|an \|the \|some )?(?!space\b)([\w ]+)$`; `^hand me (?:a \|an \|the \|some )?([\w ]+)$` | Gives a matching inventory item to the commanding player. | `GiveItemToPlayerAction` | `GiveItemSkill` | The commanding player must be visible and the item must be in inventory. |
| `^put (?:that\|it) away$`; `^unequip$`; `^empty your hands?$` | Makes the NPC unequip item. | `UnequipItemAction` | `UnequipItemSkill` | — |
| `^toss (?:that\|it)$`; `^throw (?:that\|it) away$` | Throws the currently held item stack. | `TossHeldItemAction` | `TossHeldItemSkill` | — |
| `^how many ([\w ]+) do you have$` | Reports how many matching items are in inventory. | `CountItemAction` | `CountInventoryItemSkill`, `SayMessageSkill` | — |
| `^what are you holding$`; `^show me your hand$` | Reports the currently held item. | `SayHeldItemAction` | `SayMessageSkill` | — |
| `^what are you wearing$`; `^show me your armor$` | Reports currently equipped armor. | `SayArmorAction` | `GetEquippedArmorSkill`, `SayMessageSkill` | — |
| `^do you have (?:a \|an \|any )?([\w ]+)$` | Reports whether a matching item is in inventory. | `FindItemAction` | `CountInventoryItemSkill`, `SayMessageSkill` | — |
| `^eat (?:a\|an\|the\|some) ([\w ]+)$` | Makes the NPC eat specific food. | `EatSpecificFoodAction` | `EatFoodSkill` | — |
| `^mine (?:some \|a \|an \|the )?([\w ]+)$`; `^collect (?:some \|a \|an \|the )?([\w ]+)$` | Finds, approaches, and mines a matching block. | `MineBlockAction` | `CollectBlockSkill` | — |
| `^(?:dig\|mine\|break) (?:that\|this)(?: block)?$` | Mines the block under the crosshair. | `MineTargetBlockAction` | `DigBlockSkill` | The target must be within cursor reach and diggable. |
| `^dig down$`; `^dig a hole$` | Makes the NPC dig down. | `DigDownAction` | `DigBlockSkill` | The block below must be diggable. |
| `^pick up (?:the )?(?:items\|drops)$`; `^collect (?:the )?(?:items\|drops)$` | Finds the nearest dropped item and moves to it. | `CollectDropsAction` | `CollectItemsSkill`, `MoveToLocationSkill` | — |
| `^chop (?:a \|the \|down a )?tree$`; `^chop (?:some )?wood$`; `^get (?:some )?wood$` | Finds and collects a nearby log block. | `ChopTreeAction` | `CollectBlockSkill` | — |
| `^harvest (?:the )?(?:crops\|wheat\|farm)$` | Makes the NPC harvest crops. | `HarvestCropsAction` | `HarvestCropsSkill` | Only harvests mature nearby crops. |
| `^plant (?:the \|some )?seeds$` | Makes the NPC plant seeds. | `PlantSeedsAction` | `PlantSeedsSkill` | Requires seeds and empty nearby farmland. |
| `^till the (?:soil\|ground)$`; `^hoe the ground$` | Makes the NPC till soil. | `TillSoilAction` | `TillSoilSkill` | Requires a hoe and suitable nearby ground. |
| `^open the door$` | Finds and activates a nearby door. | `OpenDoorAction` | `ActivateBlockSkill` | — |
| `^close the door$`; `^shut the door$` | Finds and activates a nearby door. | `CloseDoorAction` | `ActivateBlockSkill` | — |
| `^(?:flip\|pull\|toggle) the lever$` | Finds and activates a nearby lever. | `FlipLeverAction` | `ActivateBlockSkill` | — |
| `^(?:press\|push) the button$` | Finds and activates a nearby button. | `PressButtonAction` | `ActivateBlockSkill` | — |
| `^ring the bell$` | Finds and activates a nearby bell. | `RingBellAction` | `ActivateBlockSkill` | — |
| `^pillar up(?: (\d+))?$`; `^tower up(?: (\d+))?$` | Makes the NPC build pillar. | `BuildPillarAction` | `BuildPillarSkill` | Requires placeable blocks in inventory. |
| `^place (?:a \|an \|the )?([\w ]+)$` | Makes the NPC place block. | `PlaceBlockAction` | `PlaceBlockSkill` | — |
| `^set up a crafting table$`; `^place a crafting table$` | Places a crafting table from inventory. | `PlaceCraftingTableAction` | `PlaceBlockSkill` | — |
| `^(?:place\|put) (?:a \|down a )?torch$`; `^light it up$`; `^it(?:'s\| is) too dark$` | Places a torch from inventory. | `PlaceTorchAction` | `PlaceBlockSkill` | — |
| `^draft (?:a \|an \|some )?([\w ]+)$`; `^lake (?:a \|an \|some )?([\w ]+)$` | Makes the NPC craft item. | `CraftItemAction` | `CraftItemSkill` | Requires a known available recipe and, when needed, a nearby crafting table. |
| `^smelt (?:the \|some )?([\w ]+)$`; `^cook (?:the \|some )?([\w ]+)$` | Makes the NPC smelt item. | `SmeltItemAction` | `SmeltItemSkill` | Requires a nearby furnace, matching input, and fuel. |
| `^what(?:'s\| is) in the chest$`; `^check the chest$` | Reports the contents of a nearby container. | `SayChestContentsAction` | `ListChestSkill` | — |
| `^(?:put\|deposit\|stash) your (?:items\|loot\|stuff) in(?:to)? the chest$` | Makes the NPC deposit to chest. | `DepositToChestAction` | `DepositToChestSkill` | Deposits the complete inventory into the nearest chest, trapped chest, or barrel. |
| `^(?:take\|grab\|get) (?:the \|some \|a \|an )?([\w ]+) from the chest$` | Makes the NPC withdraw item from chest. | `WithdrawItemFromChestAction` | `WithdrawFromChestSkill` | Uses the nearest chest, trapped chest, or barrel. |
| `^empty the chest$`; `^take everything from the chest$` | Withdraws every item from a nearby container. | `EmptyChestAction` | `WithdrawFromChestSkill` | Uses the nearest chest, trapped chest, or barrel. |
| `^(?:ride\|mount) (?:the \|a \|an )?([\w ]+)$` | Makes the NPC mount entity. | `MountEntityAction` | `MountEntitySkill` | — |
| `^dismount$`; `^get off$`; `^hop off$` | Makes the NPC dismount. | `DismountAction` | `DismountSkill` | — |
| `^go fishing$`; `^catch (?:a \|some )?fish$` | Makes the NPC fish. | `FishAction` | `FishSkill` | Requires a fishing rod. |
| `^feed the ([\w ]+)$` | Makes the NPC feed animal. | `FeedAnimalAction` | `FeedAnimalSkill` | — |
| `^breed the ([\w ]+)$` | Makes the NPC breed animals. | `BreedAnimalsAction` | `BreedAnimalsSkill` | Requires two nearby matching animals and suitable food. |
| `^milk the cow$` | Uses a bucket on the nearest cow. | `MilkCowAction` | `UseItemOnEntitySkill` | — |
| `^shear the sheep$` | Uses shears on the nearest sheep. | `ShearSheepAction` | `UseItemOnEntitySkill` | — |
| `^how many ([\w ]+) are (?:there\|around\|nearby\|near you)$` | Reports how many matching entities are nearby. | `CountEntitiesAction` | `CountEntitiesSkill`, `SayMessageSkill` | — |
| `^where is the nearest ([\w ]+)$` | Reports the nearest matching entity. | `FindNearestEntityAction` | `FindNearestEntitySkill`, `SayMessageSkill` | — |
| `^throw an egg$` | Equips and throws an egg. | `ThrowEggAction` | `ActivateItemSkill` | Requires an egg in inventory. |
| `^how(?:'s\| is) your health$`; `^health check$`; `^are you (?:ok\|okay\|hurt)$` | Reports the NPC's health. | `SayHealthAction` | `SayMessageSkill` | — |
| `^are you hungry$`; `^how(?:'s\| is) your (?:food\|hunger)$` | Reports the NPC's hunger level. | `SayFoodLevelAction` | `SayMessageSkill` | — |
| `^what time is it$`; `^is it (?:day\|night)$` | Reports the Minecraft time and whether it is day or night. | `SayTimeAction` | `SayMessageSkill` | — |
| `^what(?:'s\| is) the weather$`; `^is it raining$` | Reports the current weather. | `SayWeatherAction` | `SayMessageSkill` | — |
| `^what biome (?:is this\|are you in)$` | Reports the current biome. | `SayBiomeAction` | `SayMessageSkill` | — |
| `^who(?:'s\| is) online$`; `^list (?:the )?players$` | Reports visible players. | `ListPlayersAction` | `ListVisiblePlayersSkill`, `SayMessageSkill` | — |
| `^what dimension$` | Reports the current dimension. | `SayDimensionAction` | `SayMessageSkill` | — |
| `^what version$` | Reports the Minecraft NPC version. | `SayVersionAction` | `SayMessageSkill` | — |
| `^what are you doing$`; `^status report$` | Reports the latest registered action. | `SayLatestActionAction` | `SayMessageSkill` | — |
| `^what have you been up to$`; `^how busy have you been$` | Reports the number of registered actions. | `SayActionCountAction` | `SayMessageSkill` | — |
| `^what level are you$`; `^how much (?:xp\|experience)$` | Reports the NPC's experience level. | `SayExperienceAction` | `SayMessageSkill` | — |
| `^how dark is it$`; `^what(?:'s\| is) the light level$` | Reports the light level at the current position. | `SayLightLevelAction` | `SayMessageSkill` | — |
| `^how high (?:up )?are you$`; `^what(?:'s\| is) your (?:altitude\|elevation)$` | Reports the current elevation. | `SayElevationAction` | `SayMessageSkill` | — |
| `^how far (?:away )?am i$` | Reports the distance to the commanding player. | `SayDistanceToPlayerAction` | `GetPlayerDistanceSkill`, `SayMessageSkill` | — |
| `^who(?:'s\| is) (?:closest\|nearest) to you$` | Reports the nearest visible player. | `SayNearestPlayerAction` | `FindNearestPlayerSkill`, `SayMessageSkill` | — |
| `^how long have you been (?:online\|running)$`; `^what(?:'s\| is) your uptime$` | Reports the process uptime. | `SayUptimeAction` | `SayMessageSkill` | — |
| `^(?:hello\|hi\|hey\|howdy)$` | Greets the commanding player. | `GreetAction` | `SayMessageSkill` | — |
| `^(?:bye\|goodbye\|farewell\|see (?:ya\|you))$` | Says farewell to the commanding player. | `FarewellAction` | `SayMessageSkill` | — |
| `^thank(?:s\| you)$` | Responds to the player's thanks. | `ThankYouResponseAction` | `SayMessageSkill` | — |
| `^tell (?:me \|us )?a joke$` | Tells a random joke. | `TellJokeAction` | `SayMessageSkill` | — |
| `^tell (?:me \|us )?a (?:fun )?fact$` | Tells a random Minecraft fact. | `TellFactAction` | `SayMessageSkill` | — |
| `^sing (?:me \|us )?a song$`; `^sing something$` | Sings a short song. | `SingSongAction` | `SayMessageSkill` | — |
| `^dance$`; `^show me your moves$` | Makes the NPC dance. | `DanceAction` | `DanceSkill` | — |
| `^wave$`; `^say hi with your hand$` | Waves by swinging the right arm. | `WaveAction` | `SwingArmSkill` | — |
| `^nod$` | Performs a nod gesture. | `NodAction` | `GestureSkill` | — |
| `^shake your head$` | Performs a head-shake gesture. | `ShakeHeadAction` | `GestureSkill` | — |
| `^sneak$`; `^crouch$` | Makes the NPC sneak. | `SneakAction` | `SneakSkill` | — |
| `^stand up$`; `^stop (?:sneaking\|crouching)$` | Stops sneaking to stand upright. | `StandUpAction` | `SneakSkill` | — |
| `^sprint$`; `^run forward$` | Makes the NPC sprint. | `SprintAction` | `SprintSkill` | Runs forward for a fixed duration. |
| `^flip a coin$`; `^heads or tails$` | Flips a virtual coin and reports the result. | `CoinFlipAction` | `SayMessageSkill` | — |
| `^roll (?:a \|the )?(?:die\|dice)$`; `^roll a d(\d+)$` | Rolls a die with the requested number of sides. | `RollDiceAction` | `SayMessageSkill` | Defaults to six sides when omitted. |
| `^count ?down from (\d+)$` | Counts down from the requested number. | `CountdownAction` | `SayMessageSkill` | — |
| `^say something nice$`; `^compliment me$` | Gives the commanding player a compliment. | `ComplimentPlayerAction` | `SayMessageSkill` | — |
| `^tell me a secret$` | Whispers a message to the commanding player. | `WhisperSecretAction` | `WhisperSkill` | — |

## Design

Minecraft NPC separates command orchestration from Minecraft domain operations.
Code under `lib/actions/` decides what should happen for a command, while code
under `lib/skills/` performs one focused operation against the Mineflayer bot.

### Actions

Actions are intentionally lightweight. An action should:

* Retrieve command values and configuration from its options.
* Log a step heading describing the requested activity.
* Invoke one skill, or coordinate several skills when the activity requires a
  sequence of operations.
* Produce player-facing messages when a result needs to be explained.
* Register the final action status.

Actions own orchestration and presentation. Decisions such as "find a player,
then walk to that player's position" belong in an action because they compose
multiple capabilities. Keeping this coordination out of skills makes the flow
visible at the command boundary and prevents hidden chains of side effects.

Actions should use the public methods on `Npc` rather than reading Mineflayer
state directly. If an action needs domain information that is not exposed yet,
add a focused query skill and an `Npc` method for it.

### Skills

A skill is a self-contained Minecraft capability. A skill should:

* Perform one focused command or query against the Mineflayer bot.
* Receive all operation-specific input through its options.
* Return useful data for query operations.
* Report failures through the shared skill outcome mechanism.
* Avoid command parsing, action registration, and step-heading logging.

Skills must not call other skills. When an operation needs multiple skills, the
action coordinates them through `Npc`. This keeps each skill reusable and makes
its dependencies, side effects, and unit tests straightforward.

Domain skills should not decide when or what the NPC says. They return values,
errors, or structured outcomes so the action can choose the appropriate
player-facing message. Communication itself can still be a skill when speaking
is the requested capability, such as saying or whispering a message.

### Outcomes and status

Skills managed by `Npc` defer informational and failure messages to the calling
action. `Npc` converts skill results into a consistent status or structured
outcome, and the action registers that status after any required follow-up
skills and messages have completed. Standalone skill use retains the legacy
direct-chat behaviour for compatibility.

This division gives each layer a clear responsibility:

* Actions answer: "What steps fulfil this player command?"
* Skills answer: "How is this single Minecraft operation performed?"
* `Npc` provides the boundary that executes skills and normalises their results.

### Autonomous engines (experimental)

Auto-mode is the NPC's autonomous operating state, while an engine supplies the
policy used in that state. Long-running decision engines live under
`lib/engines/`, separately from actions and skills. Every engine extends
`BaseEngine`, which provides scheduling,
lifecycle state, overlap prevention, status reporting, and consistent error
handling. Concrete engines provide an identity, evaluation interval, and
policy evaluation. The `homesteader` engine uses a deterministic survival policy:
flee a nearby threat when health is low, otherwise defend, eat when hungry,
return to its `init_coords` home at night, sleep when it reaches home, hunt an
allowed animal when food reserves are low, and remain idle when no intervention
is needed. Home uses a configurable radius so exact block coordinates are not
required, and failed sleep attempts are rate-limited. The engine observes state
through query skills and performs decisions through the same actions available
to players.

Players can say `enable auto mode as homesteader`, `disable auto mode`, or
`auto mode status`. Omitting `as homesteader` selects the configured
`auto_mode_engine`, which defaults to `homesteader`.
Disabling auto-mode cancels its timer and current movement. Disconnect and
error handling also stop the engine. Hunting is constrained by
`auto_mode_allowed_hunt_animals`; protected or baby animals are not selected.
This separation leaves room for future engines, such as an AI-driven one, without
putting autonomous policy inside actions or skills.

## Debugging

To enable debug logs at protocol level, set `DEBUG="minecraft-protocol"` environment variable when running `minecraft-npc`. You'll get more detailed information when the program exits due to an error:

```text
Spawning bot...
    minecraft-protocol writing packet handshaking.set_protocol +0ms
    minecraft-protocol {
    minecraft-protocol   protocolVersion: 763,
    minecraft-protocol   serverHost: 'somehost',
    minecraft-protocol   serverPort: 25565,
    minecraft-protocol   nextState: 2
    minecraft-protocol } +1ms
    minecraft-protocol writing packet login.login_start +48ms
    minecraft-protocol {
    minecraft-protocol   username: 'someusername',
    minecraft-protocol   signature: null,
    minecraft-protocol   playerUUID: 'd3afe860-c1dd-3d13-8ec6-8680489964b0'
    minecraft-protocol } +0ms
    minecraft-protocol read packet login.disconnect +370ms
    minecraft-protocol {
    minecraft-protocol   "reason": "{\"translate\":\"multiplayer.disconnect.incompatible\",\"with\":[\"1.20.4\"]}"
    minecraft-protocol } +1ms
Bot has been kicked:
"{\"translate\":\"multiplayer.disconnect.incompatible\",\"with\":[\"1.20.4\"]}"
```

## Colophon

<!-- BEGIN:DEVELOPERS_GUIDE -->
[Developer's Guide](https://littlegodzillalaboratory.github.io/developers-guide-nodejs.html)
<!-- END:DEVELOPERS_GUIDE -->

<!-- BEGIN:BUILD_REPORTS -->
Build reports:

* [Code complexity report](https://littlegodzillalaboratory.github.io/minecraft-npc/complexity/plato/index.html)
* [Unit tests report](https://littlegodzillalaboratory.github.io/minecraft-npc/test/mocha.txt)
* [Test coverage report](https://littlegodzillalaboratory.github.io/minecraft-npc/coverage/c8/index.html)
* [Integration tests report](https://littlegodzillalaboratory.github.io/minecraft-npc/test-integration/cmdt.txt)
* [API Documentation](https://littlegodzillalaboratory.github.io/minecraft-npc/doc/jsdoc/index.html)

<!-- END:BUILD_REPORTS -->

Related projects:

* [mineflayer-chatgpt](https://github.com/littlegodzillalaboratory/mineflayer-chatgpt) - Mineflayer plugin for sending and receiving messages with OpenAI ChatGPT
