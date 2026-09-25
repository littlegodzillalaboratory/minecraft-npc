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
| <code>^enable auto mode(?: as ([a-z][a-z0-9-]*))?$</code><br><code>^start auto mode(?: as ([a-z][a-z0-9-]*))?$</code><br><code>^be autonomous(?: as ([a-z][a-z0-9-]*))?$</code> | Enables autonomous mode using the requested policy engine. | `EnableAutoModeAction` | — | Defaults to `homesteader`; the engine must be registered. |
| <code>^disable auto mode$</code><br><code>^stop auto mode$</code> | Disables autonomous mode and stops its current activity. | `DisableAutoModeAction` | — | Stops the active engine and its movement. |
| <code>^auto mode status$</code><br><code>^what is your autonomous goal$</code> | Reports the active auto-mode engine, goal, and state. | `SayAutoModeStatusAction` | `SayMessageSkill` | — |
| <code>^eat$</code><br><code>^eat something$</code><br><code>^eat food$</code><br><code>^i am hungry$</code><br><code>^i'm hungry$</code> | Makes the NPC eat. | `EatAction` | `EatSkill` | — |
| <code>^empty inventory$</code><br><code>^drop all items$</code><br><code>^clear inventory$</code> | Makes the NPC empty inventory. | `EmptyInventoryAction` | `EmptyInventorySkill` | — |
| <code>^what is your location\?$</code><br><code>^send location$</code> | Reports the NPC's current coordinates. | `SayCurrentLocationAction` | `SayMessageSkill` | — |
| <code>^guard the area$</code><br><code>^defend the area$</code><br><code>^stand your ground$</code> | Makes the NPC guard current location. | `GuardCurrentLocationAction` | `GuardLocationSkill` | Continuous until stopped; guards within a 30-block radius. |
| <code>^come here$</code><br><code>^get over here$</code> | Moves to the commanding player's position. | `MoveToPlayerLocationAction` | `GetPlayerPositionSkill`<br>`MoveToLocationSkill` | The commanding player must be visible. |
| <code>^go to sleep$</code><br><code>^time to sleep$</code><br><code>^sleep$</code> | Makes the NPC sleep. | `SleepAction` | `SleepSkill` | Requires a nearby usable bed and a valid sleeping time or thunderstorm. |
| <code>^stop$</code><br><code>^halt$</code><br><code>^hold up$</code> | Stops current movement, combat, and continuous activities. | `StopCurrentAction` | `StopSkill` | — |
| <code>^move\s+(\d+)\s+blocks?\s+(forward&#124;backward&#124;leftward&#124;rightward&#124;downward&#124;upward)$</code> | Moves the requested distance in a relative direction. | `MoveBlocksDistanceToDirectionAction` | `MoveBlocksDistanceToDirectionSkill` | — |
| <code>^(?:move to&#124;find&#124;walk to)\s+(?:a&#124;an&#124;the)\s+(.+)$</code> | Finds a nearby object and moves to it. | `MoveToObjectAction` | `MoveToObjectSkill`<br>`MoveToLocationSkill` | — |
| <code>^follow me$</code><br><code>^come with me$</code> | Makes the NPC follow player. | `FollowPlayerAction` | `FollowPlayerSkill` | Continuous until stopped; the commanding player must be visible. |
| <code>^stop following$</code><br><code>^stay there$</code> | Stops following and other current movement. | `StopFollowingAction` | `StopSkill` | — |
| <code>^go to (-?\d+)[, ]+(-?\d+)[, ]+(-?\d+)$</code> | Makes the NPC move to coordinates. | `MoveToCoordinatesAction` | `MoveToLocationSkill` | — |
| <code>^go home$</code><br><code>^return home$</code><br><code>^go back home$</code> | Returns to the configured initial coordinates. | `GoHomeAction` | `MoveToLocationSkill` | Home is `init_coords`. |
| <code>^jump$</code><br><code>^jump up and down$</code> | Makes the NPC jump. | `JumpAction` | `JumpSkill` | — |
| <code>^look at me$</code> | Turns to look at the commanding player. | `LookAtPlayerAction` | `GetPlayerPositionSkill`<br>`LookAtLocationSkill`<br>`SayMessageSkill` | The commanding player must be visible. |
| <code>^face (north&#124;south&#124;east&#124;west)$</code><br><code>^look to the (north&#124;south&#124;east&#124;west)$</code> | Makes the NPC face direction. | `FaceDirectionAction` | `FaceDirectionSkill` | — |
| <code>^turn around$</code> | Turns to face the opposite direction. | `TurnAroundAction` | `FaceDirectionSkill` | — |
| <code>^wander around$</code><br><code>^go for a walk$</code><br><code>^explore a bit$</code> | Makes the NPC wander around. | `WanderAroundAction` | `WanderSkill`<br>`MoveToLocationSkill` | — |
| <code>^back away$</code><br><code>^back off$</code><br><code>^give me some space$</code> | Moves away from the current facing direction. | `BackAwayAction` | `MoveBlocksDistanceToDirectionSkill` | — |
| <code>^go to player (\w+)$</code> | Finds a named player and moves to them. | `GoToPlayerAction` | `GetPlayerPositionSkill`<br>`MoveToLocationSkill`<br>`SayMessageSkill` | The named player must be visible. |
| <code>^stay here$</code><br><code>^wait here$</code><br><code>^don't move$</code> | Stops current movement and remains in place. | `StayHereAction` | `StopSkill` | — |
| <code>^attack player (\w+)$</code> | Makes the NPC attack player. | `AttackPlayerAction` | `AttackPlayerSkill` | The named player must be visible. |
| <code>^(?:attack&#124;kill) (?:the )?nearest ([\w ]+)$</code> | Attacks the nearest matching entity. | `AttackNearestMobAction` | `AttackNearestEntitySkill` | — |
| <code>^defend me$</code><br><code>^protect me$</code><br><code>^keep me safe$</code> | Attacks a hostile mob threatening the commanding player. | `DefendMeAction` | `DefendPlayerSkill` | Only attacks entities classified as hostile mobs. |
| <code>^run away$</code><br><code>^flee$</code><br><code>^retreat$</code> | Finds an escape destination away from the nearest threat. | `FleeAction` | `FleeSkill`<br>`MoveToLocationSkill` | Requires a nearby hostile mob. |
| <code>^(?:equip&#124;hold&#124;wield) (?:your &#124;the &#124;a &#124;an )?([\w ]+)$</code> | Makes the NPC equip item. | `EquipItemAction` | `EquipItemSkill` | — |
| <code>^draw your (?:sword&#124;weapon)$</code><br><code>^equip (?:your )?weapon$</code><br><code>^arm yourself$</code> | Equips an available weapon. | `EquipWeaponAction` | `EquipItemSkill` | Uses the first available sword or axe. |
| <code>^raise your shield$</code><br><code>^equip (?:your )?shield$</code> | Equips an available shield. | `EquipShieldAction` | `EquipItemSkill` | Requires a shield in inventory. |
| <code>^put on (?:your )?armor$</code><br><code>^armor up$</code><br><code>^gear up$</code> | Makes the NPC equip armor. | `EquipArmorAction` | `EquipArmorSkill` | — |
| <code>^stand down$</code><br><code>^cease fire$</code><br><code>^stop attacking$</code> | Stops combat and other current activities. | `StandDownAction` | `StopSkill` | — |
| <code>^hunt for food$</code><br><code>^go hunting$</code> | Hunts an allowed nearby animal for food. | `HuntFoodAction` | `HuntFoodSkill` | Limited by the configured animal allow-list and maximum distance. |
| <code>^keep watch$</code><br><code>^any (?:mobs&#124;threats) nearby$</code><br><code>^report threats$</code> | Reports hostile mobs within the configured radius. | `ReportThreatsAction` | `FindNearbyThreatsSkill`<br>`SayMessageSkill` | — |
| <code>^list (?:your )?inventory$</code><br><code>^what(?:'s&#124; is) in your inventory$</code><br><code>^show me your inventory$</code> | Reports the contents of the NPC's inventory. | `ListInventoryAction` | `GetInventorySummarySkill`<br>`SayMessageSkill` | — |
| <code>^drop (?:your &#124;the &#124;a &#124;an )?(?!all\b)([\w ]+)$</code> | Makes the NPC drop item. | `DropItemAction` | `DropItemSkill` | — |
| <code>^give me (?:a &#124;an &#124;the &#124;some )?(?!space\b)([\w ]+)$</code><br><code>^hand me (?:a &#124;an &#124;the &#124;some )?([\w ]+)$</code> | Gives a matching inventory item to the commanding player. | `GiveItemToPlayerAction` | `GiveItemSkill` | The commanding player must be visible and the item must be in inventory. |
| <code>^put (?:that&#124;it) away$</code><br><code>^unequip$</code><br><code>^empty your hands?$</code> | Makes the NPC unequip item. | `UnequipItemAction` | `UnequipItemSkill` | — |
| <code>^toss (?:that&#124;it)$</code><br><code>^throw (?:that&#124;it) away$</code> | Throws the currently held item stack. | `TossHeldItemAction` | `TossHeldItemSkill` | — |
| <code>^how many ([\w ]+) do you have$</code> | Reports how many matching items are in inventory. | `CountItemAction` | `CountInventoryItemSkill`<br>`SayMessageSkill` | — |
| <code>^what are you holding$</code><br><code>^show me your hand$</code> | Reports the currently held item. | `SayHeldItemAction` | `SayMessageSkill` | — |
| <code>^what are you wearing$</code><br><code>^show me your armor$</code> | Reports currently equipped armor. | `SayArmorAction` | `GetEquippedArmorSkill`<br>`SayMessageSkill` | — |
| <code>^do you have (?:a &#124;an &#124;any )?([\w ]+)$</code> | Reports whether a matching item is in inventory. | `FindItemAction` | `CountInventoryItemSkill`<br>`SayMessageSkill` | — |
| <code>^eat (?:a&#124;an&#124;the&#124;some) ([\w ]+)$</code> | Makes the NPC eat specific food. | `EatSpecificFoodAction` | `EatFoodSkill` | — |
| <code>^mine (?:some &#124;a &#124;an &#124;the )?([\w ]+)$</code><br><code>^collect (?:some &#124;a &#124;an &#124;the )?([\w ]+)$</code> | Finds, approaches, and mines a matching block. | `MineBlockAction` | `CollectBlockSkill` | — |
| <code>^(?:dig&#124;mine&#124;break) (?:that&#124;this)(?: block)?$</code> | Mines the block under the crosshair. | `MineTargetBlockAction` | `DigBlockSkill` | The target must be within cursor reach and diggable. |
| <code>^dig down$</code><br><code>^dig a hole$</code> | Makes the NPC dig down. | `DigDownAction` | `DigBlockSkill` | The block below must be diggable. |
| <code>^pick up (?:the )?(?:items&#124;drops)$</code><br><code>^collect (?:the )?(?:items&#124;drops)$</code> | Finds the nearest dropped item and moves to it. | `CollectDropsAction` | `CollectItemsSkill`<br>`MoveToLocationSkill` | — |
| <code>^chop (?:a &#124;the &#124;down a )?tree$</code><br><code>^chop (?:some )?wood$</code><br><code>^get (?:some )?wood$</code> | Finds and collects a nearby log block. | `ChopTreeAction` | `CollectBlockSkill` | — |
| <code>^harvest (?:the )?(?:crops&#124;wheat&#124;farm)$</code> | Makes the NPC harvest crops. | `HarvestCropsAction` | `HarvestCropsSkill` | Only harvests mature nearby crops. |
| <code>^plant (?:the &#124;some )?seeds$</code> | Makes the NPC plant seeds. | `PlantSeedsAction` | `PlantSeedsSkill` | Requires seeds and empty nearby farmland. |
| <code>^till the (?:soil&#124;ground)$</code><br><code>^hoe the ground$</code> | Makes the NPC till soil. | `TillSoilAction` | `TillSoilSkill` | Requires a hoe and suitable nearby ground. |
| <code>^open the door$</code> | Finds and activates a nearby door. | `OpenDoorAction` | `ActivateBlockSkill` | — |
| <code>^close the door$</code><br><code>^shut the door$</code> | Finds and activates a nearby door. | `CloseDoorAction` | `ActivateBlockSkill` | — |
| <code>^(?:flip&#124;pull&#124;toggle) the lever$</code> | Finds and activates a nearby lever. | `FlipLeverAction` | `ActivateBlockSkill` | — |
| <code>^(?:press&#124;push) the button$</code> | Finds and activates a nearby button. | `PressButtonAction` | `ActivateBlockSkill` | — |
| <code>^ring the bell$</code> | Finds and activates a nearby bell. | `RingBellAction` | `ActivateBlockSkill` | — |
| <code>^pillar up(?: (\d+))?$</code><br><code>^tower up(?: (\d+))?$</code> | Makes the NPC build pillar. | `BuildPillarAction` | `BuildPillarSkill` | Requires placeable blocks in inventory. |
| <code>^place (?:a &#124;an &#124;the )?([\w ]+)$</code> | Makes the NPC place block. | `PlaceBlockAction` | `PlaceBlockSkill` | — |
| <code>^set up a crafting table$</code><br><code>^place a crafting table$</code> | Places a crafting table from inventory. | `PlaceCraftingTableAction` | `PlaceBlockSkill` | — |
| <code>^(?:place&#124;put) (?:a &#124;down a )?torch$</code><br><code>^light it up$</code><br><code>^it(?:'s&#124; is) too dark$</code> | Places a torch from inventory. | `PlaceTorchAction` | `PlaceBlockSkill` | — |
| <code>^draft (?:a &#124;an &#124;some )?([\w ]+)$</code><br><code>^lake (?:a &#124;an &#124;some )?([\w ]+)$</code> | Makes the NPC craft item. | `CraftItemAction` | `CraftItemSkill` | Requires a known available recipe and, when needed, a nearby crafting table. |
| <code>^smelt (?:the &#124;some )?([\w ]+)$</code><br><code>^cook (?:the &#124;some )?([\w ]+)$</code> | Makes the NPC smelt item. | `SmeltItemAction` | `SmeltItemSkill` | Requires a nearby furnace, matching input, and fuel. |
| <code>^what(?:'s&#124; is) in the chest$</code><br><code>^check the chest$</code> | Reports the contents of a nearby container. | `SayChestContentsAction` | `ListChestSkill` | — |
| <code>^(?:put&#124;deposit&#124;stash) your (?:items&#124;loot&#124;stuff) in(?:to)? the chest$</code> | Makes the NPC deposit to chest. | `DepositToChestAction` | `DepositToChestSkill` | Deposits the complete inventory into the nearest chest, trapped chest, or barrel. |
| <code>^(?:take&#124;grab&#124;get) (?:the &#124;some &#124;a &#124;an )?([\w ]+) from the chest$</code> | Makes the NPC withdraw item from chest. | `WithdrawItemFromChestAction` | `WithdrawFromChestSkill` | Uses the nearest chest, trapped chest, or barrel. |
| <code>^empty the chest$</code><br><code>^take everything from the chest$</code> | Withdraws every item from a nearby container. | `EmptyChestAction` | `WithdrawFromChestSkill` | Uses the nearest chest, trapped chest, or barrel. |
| <code>^(?:ride&#124;mount) (?:the &#124;a &#124;an )?([\w ]+)$</code> | Makes the NPC mount entity. | `MountEntityAction` | `MountEntitySkill` | — |
| <code>^dismount$</code><br><code>^get off$</code><br><code>^hop off$</code> | Makes the NPC dismount. | `DismountAction` | `DismountSkill` | — |
| <code>^go fishing$</code><br><code>^catch (?:a &#124;some )?fish$</code> | Makes the NPC fish. | `FishAction` | `FishSkill` | Requires a fishing rod. |
| <code>^feed the ([\w ]+)$</code> | Makes the NPC feed animal. | `FeedAnimalAction` | `FeedAnimalSkill` | — |
| <code>^breed the ([\w ]+)$</code> | Makes the NPC breed animals. | `BreedAnimalsAction` | `BreedAnimalsSkill` | Requires two nearby matching animals and suitable food. |
| <code>^milk the cow$</code> | Uses a bucket on the nearest cow. | `MilkCowAction` | `UseItemOnEntitySkill` | — |
| <code>^shear the sheep$</code> | Uses shears on the nearest sheep. | `ShearSheepAction` | `UseItemOnEntitySkill` | — |
| <code>^how many ([\w ]+) are (?:there&#124;around&#124;nearby&#124;near you)$</code> | Reports how many matching entities are nearby. | `CountEntitiesAction` | `CountEntitiesSkill`<br>`SayMessageSkill` | — |
| <code>^where is the nearest ([\w ]+)$</code> | Reports the nearest matching entity. | `FindNearestEntityAction` | `FindNearestEntitySkill`<br>`SayMessageSkill` | — |
| <code>^throw an egg$</code> | Equips and throws an egg. | `ThrowEggAction` | `ActivateItemSkill` | Requires an egg in inventory. |
| <code>^how(?:'s&#124; is) your health$</code><br><code>^health check$</code><br><code>^are you (?:ok&#124;okay&#124;hurt)$</code> | Reports the NPC's health. | `SayHealthAction` | `SayMessageSkill` | — |
| <code>^are you hungry$</code><br><code>^how(?:'s&#124; is) your (?:food&#124;hunger)$</code> | Reports the NPC's hunger level. | `SayFoodLevelAction` | `SayMessageSkill` | — |
| <code>^what time is it$</code><br><code>^is it (?:day&#124;night)$</code> | Reports the Minecraft time and whether it is day or night. | `SayTimeAction` | `SayMessageSkill` | — |
| <code>^what(?:'s&#124; is) the weather$</code><br><code>^is it raining$</code> | Reports the current weather. | `SayWeatherAction` | `SayMessageSkill` | — |
| <code>^what biome (?:is this&#124;are you in)$</code> | Reports the current biome. | `SayBiomeAction` | `SayMessageSkill` | — |
| <code>^who(?:'s&#124; is) online$</code><br><code>^list (?:the )?players$</code> | Reports visible players. | `ListPlayersAction` | `ListVisiblePlayersSkill`<br>`SayMessageSkill` | — |
| <code>^what dimension$</code> | Reports the current dimension. | `SayDimensionAction` | `SayMessageSkill` | — |
| <code>^what version$</code> | Reports the Minecraft NPC version. | `SayVersionAction` | `SayMessageSkill` | — |
| <code>^what are you doing$</code><br><code>^status report$</code> | Reports the latest registered action. | `SayLatestActionAction` | `SayMessageSkill` | — |
| <code>^what have you been up to$</code><br><code>^how busy have you been$</code> | Reports the number of registered actions. | `SayActionCountAction` | `SayMessageSkill` | — |
| <code>^what level are you$</code><br><code>^how much (?:xp&#124;experience)$</code> | Reports the NPC's experience level. | `SayExperienceAction` | `SayMessageSkill` | — |
| <code>^how dark is it$</code><br><code>^what(?:'s&#124; is) the light level$</code> | Reports the light level at the current position. | `SayLightLevelAction` | `SayMessageSkill` | — |
| <code>^how high (?:up )?are you$</code><br><code>^what(?:'s&#124; is) your (?:altitude&#124;elevation)$</code> | Reports the current elevation. | `SayElevationAction` | `SayMessageSkill` | — |
| <code>^how far (?:away )?am i$</code> | Reports the distance to the commanding player. | `SayDistanceToPlayerAction` | `GetPlayerDistanceSkill`<br>`SayMessageSkill` | — |
| <code>^who(?:'s&#124; is) (?:closest&#124;nearest) to you$</code> | Reports the nearest visible player. | `SayNearestPlayerAction` | `FindNearestPlayerSkill`<br>`SayMessageSkill` | — |
| <code>^how long have you been (?:online&#124;running)$</code><br><code>^what(?:'s&#124; is) your uptime$</code> | Reports the process uptime. | `SayUptimeAction` | `SayMessageSkill` | — |
| <code>^(?:hello&#124;hi&#124;hey&#124;howdy)$</code> | Greets the commanding player. | `GreetAction` | `SayMessageSkill` | — |
| <code>^(?:bye&#124;goodbye&#124;farewell&#124;see (?:ya&#124;you))$</code> | Says farewell to the commanding player. | `FarewellAction` | `SayMessageSkill` | — |
| <code>^thank(?:s&#124; you)$</code> | Responds to the player's thanks. | `ThankYouResponseAction` | `SayMessageSkill` | — |
| <code>^tell (?:me &#124;us )?a joke$</code> | Tells a random joke. | `TellJokeAction` | `SayMessageSkill` | — |
| <code>^tell (?:me &#124;us )?a (?:fun )?fact$</code> | Tells a random Minecraft fact. | `TellFactAction` | `SayMessageSkill` | — |
| <code>^sing (?:me &#124;us )?a song$</code><br><code>^sing something$</code> | Sings a short song. | `SingSongAction` | `SayMessageSkill` | — |
| <code>^dance$</code><br><code>^show me your moves$</code> | Makes the NPC dance. | `DanceAction` | `DanceSkill` | — |
| <code>^wave$</code><br><code>^say hi with your hand$</code> | Waves by swinging the right arm. | `WaveAction` | `SwingArmSkill` | — |
| <code>^nod$</code> | Performs a nod gesture. | `NodAction` | `GestureSkill` | — |
| <code>^shake your head$</code> | Performs a head-shake gesture. | `ShakeHeadAction` | `GestureSkill` | — |
| <code>^sneak$</code><br><code>^crouch$</code> | Makes the NPC sneak. | `SneakAction` | `SneakSkill` | — |
| <code>^stand up$</code><br><code>^stop (?:sneaking&#124;crouching)$</code> | Stops sneaking to stand upright. | `StandUpAction` | `SneakSkill` | — |
| <code>^sprint$</code><br><code>^run forward$</code> | Makes the NPC sprint. | `SprintAction` | `SprintSkill` | Runs forward for a fixed duration. |
| <code>^flip a coin$</code><br><code>^heads or tails$</code> | Flips a virtual coin and reports the result. | `CoinFlipAction` | `SayMessageSkill` | — |
| <code>^roll (?:a &#124;the )?(?:die&#124;dice)$</code><br><code>^roll a d(\d+)$</code> | Rolls a die with the requested number of sides. | `RollDiceAction` | `SayMessageSkill` | Defaults to six sides when omitted. |
| <code>^count ?down from (\d+)$</code> | Counts down from the requested number. | `CountdownAction` | `SayMessageSkill` | — |
| <code>^say something nice$</code><br><code>^compliment me$</code> | Gives the commanding player a compliment. | `ComplimentPlayerAction` | `SayMessageSkill` | — |
| <code>^tell me a secret$</code> | Whispers a message to the commanding player. | `WhisperSecretAction` | `WhisperSkill` | — |

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
