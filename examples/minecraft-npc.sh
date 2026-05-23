#!/usr/bin/env bash
set -o nounset
set -o errexit

cd ../

printf "\n\n========================================\n"
printf "Install dependencies of Minecraft NPC:\n"
npm install

printf "\n\n========================================\n"
printf "Link Minecraft NPC:\n"
npm link minecraft-npc

cd examples/

printf "\n\n========================================\n"
printf "Start example bot:\n"
minecraft-npc start --conf-file minecraft-npc.yaml
