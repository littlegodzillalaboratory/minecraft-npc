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
| chatgpt_minimum_confidence_score | Minimum confidence score threshold for ChatGPT responses | Optional | |
| chatgpt_cool_down_in_seconds | Cool-down period in seconds between ChatGPT responses | Optional | |
| chatgpt_fallback_message | Message to send when ChatGPT cannot provide a response | Optional | |
| auto_mode_enabled | Enable deterministic autonomous survival behaviour after spawning | Optional | `false` |
| auto_mode_evaluation_interval_in_seconds | Seconds between autonomous policy evaluations | Optional | `2` |
| auto_mode_hunger_threshold | Food level at or below which the NPC eats | Optional | `14` |
| auto_mode_minimum_food_reserve | Minimum inventory food count before the NPC hunts | Optional | `12` |
| auto_mode_flee_health_threshold | Health at or below which the NPC flees nearby threats | Optional | `8` |
| auto_mode_allowed_hunt_animals | Animal names that autonomous hunting may target | Optional | `[cow, pig, chicken, sheep, rabbit]` |
| auto_mode_maximum_hunting_distance | Maximum distance to an autonomous hunting target | Optional | `64` |
| auto_mode_threat_radius | Radius used to detect hostile mobs | Optional | `16` |

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

Long-running decision loops live under `lib/engines/`, separately from actions
and skills. Auto-mode uses a deterministic survival policy: flee a nearby
threat when health is low, otherwise defend, eat when hungry, hunt an allowed
animal when food reserves are low, and remain idle when no intervention is
needed. The engine observes state through query skills and performs decisions
through the same actions available to players.

Players can say `enable auto mode`, `disable auto mode`, or `auto mode status`.
Disabling auto-mode cancels its timer and current movement. Disconnect and
error handling also stop the engine. Hunting is constrained by
`auto_mode_allowed_hunt_animals`; protected or baby animals are not selected.
This separation leaves room for future engines, such as an AI-driven one, without
putting autonomous policy inside actions or skills.

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
