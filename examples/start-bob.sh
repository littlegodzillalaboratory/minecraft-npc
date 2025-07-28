#!/usr/bin/env bash
set -o nounset
set -o errexit

CHATGPT_API_KEY="${GODZILLA_OPENAI_API_KEY_MINECRAFT_NPC_BOB}" \
  minecraft-npc start --conf-file examples/bob.yaml