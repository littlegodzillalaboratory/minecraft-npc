<img align="right" src="https://raw.github.com/littlegodzillalaboratory/minecraft-npc/main/avatar.jpg" alt="Avatar"/>

[![Build Status](https://github.com/littlegodzillalaboratory/minecraft-npc/workflows/CI/badge.svg)](https://github.com/littlegodzillalaboratory/minecraft-npc/actions?query=workflow%3ACI)
[![Dependencies Status](https://img.shields.io/librariesio/release/npm/minecraft-npc)](https://libraries.io/npm/minecraft-npc)
[![Code Scanning Status](https://github.com/littlegodzillalaboratory/minecraft-npc/workflows/CodeQL/badge.svg)](https://github.com/littlegodzillalaboratory/minecraft-npc/actions?query=workflow%3ACodeQL)
[![Coverage Status](https://coveralls.io/repos/github/littlegodzillalaboratory/minecraft-npc/badge.svg?branch=main)](https://coveralls.io/r/littlegodzillalaboratory/minecraft-npc?branch=main)
[![Security Status](https://snyk.io/test/github/littlegodzillalaboratory/minecraft-npc/badge.svg)](https://snyk.io/test/github/littlegodzillalaboratory/minecraft-npc)
[![Published Version](https://img.shields.io/npm/v/minecraft-npc.svg)](https://www.npmjs.com/package/minecraft-npc)
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

Colophon
--------

[Developer's Guide](https://littlegodzillalaboratory.github.io/developers_guide.html#nodejs)

Build reports:

* [Code complexity report](https://littlegodzillalaboratory.github.io/minecraft-npc/complexity/plato/index.html)
* [Unit tests report](https://littlegodzillalaboratory.github.io/minecraft-npc/test/mocha.txt)
* [Test coverage report](https://littlegodzillalaboratory.github.io/minecraft-npc/coverage/c8/index.html)
* [Integration tests report](https://littlegodzillalaboratory.github.io/minecraft-npc/test-integration/cmdt.txt)
* [API Documentation](https://littlegodzillalaboratory.github.io/minecraft-npc/doc/jsdoc/index.html)
