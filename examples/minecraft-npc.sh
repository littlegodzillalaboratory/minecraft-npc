#!/usr/bin/env bash
set -o nounset
set -o errexit

printf "\n\n========================================\n"
printf "Install dependencies of example bot:\n"
npm link

cd ../

printf "\n\n========================================\n"
printf "Install dependencies of Minecraft NPC:\n"
npm install

printf "\n\n========================================\n"
printf "Link local Mineflayer ChatGPT:\n"
npm link mineflayer-chatgpt

printf "\n\n========================================\n"
printf "Start example bot:\n"
node mineflayer-chatgpt-bot.js

CHATGPT_API_KEY="${GODZILLA_OPENAI_API_KEY_MINECRAFT_NPC_LOLO}" \
  minecraft-npc start --conf-file examples/lolo.yaml