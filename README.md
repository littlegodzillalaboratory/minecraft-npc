<img align="right" src="https://raw.github.com/cliffano/minecraft-npc/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://github.com/cliffano/minecraft-npc/workflows/CI/badge.svg)](https://github.com/cliffano/minecraft-npc/actions?query=workflow%3ACI)
[![Security Status](https://snyk.io/test/github/cliffano/minecraft-npc/badge.svg)](https://snyk.io/test/github/cliffano/minecraft-npc)
[![Dependencies Status](https://img.shields.io/librariesio/release/npm/minecraft-npc)](https://libraries.io/github/cliffano/minecraft-npc)
[![Coverage Status](https://img.shields.io/coveralls/cliffano/minecraft-npc.svg)](https://coveralls.io/r/cliffano/minecraft-npc?branch=master)
[![Published Version](https://img.shields.io/npm/v/minecraft-npc.svg)](http://www.npmjs.com/package/minecraft-npc)
<br/>

Minecraft Bob
-------------

![Bob logs screenshot](docs/images/bob-logs.png "Bob logs screenshot")

Configuration
-------------

| Property | Description | Mandatory/Optional | Default Value |
|----------|-------------|--------------------|---------------|
| Host | Minecraft server host | Optional | `localhost` |
| Port | Minecraft server port | Optional | `25565` |
| Viewer Port | Minecraft viewer port | Optional | `3000` |
| Username | Minecraft username | Optional, only needed on online mode | |
| Password | Minecraft password | Optional, only needed on online mode | |

Debugging
---------

To enable debug logs at protocol level, set `DEBUG="minecraft-protocol"` environment variable when running `minecraft-npc`. You'll get more detailed information when the program exits due to an error:

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
