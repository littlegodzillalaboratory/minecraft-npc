"use strict";
import bag from "bagofcli";
import MinecraftNpc from "./minecraft-npc.js";
import p from "path";

const DIRNAME = p.dirname(import.meta.url).replace("file://", "");

function _start(args) {
  function cb(err, result) {
    if (err) {
      bag.exit(err);
    } else {
      const opts = {
        host: result.host,
        port: result.port,
        version: result.version,
        viewerPort: result.viewer_port,
        webInventoryPort: result.web_inventory_port,
        username: result.username,
        password: result.password,
        initCoords: result.init_coords,
        initMessages: result.init_messages,
        chatGptApiKey: result.chatgpt_apikey || process.env.CHATGPT_API_KEY,
        chatGptModel: result.chatgpt_model,
        chatGptInstructions: result.chatgpt_instructions,
        chatGptEnableModeration: result.chatgpt_enable_moderation,
        chatGptEnableMessageLogging: result.chatgpt_enable_message_logging,
        chatGptMinimumConfidenceScore: result.chatgpt_minimum_confidence_score,
        chatGptCoolDownInSeconds: result.chatgpt_cool_down_in_seconds,
        chatGptFallbackMessage: result.chatgpt_fallback_message,
        chatGptEnableSecurityInstructions: result.chatgpt_enable_security_instructions,
      };

      const minecraftNpc = new MinecraftNpc(opts);
      minecraftNpc.start(bag.exit);
    }
  }

  const confFile = args.confFile || "minecraft-npc.yaml";
  bag.lookupConfig(
    [
      "host",
      "port",
      "version",
      "viewer_port",
      "web_inventory_port",
      "username",
      "password",
      "instructions",
      "init_coords",
      "init_messages",
      "chatgpt_apikey",
      "chatgpt_model",
      "chatgpt_instructions",
      "chatgpt_enable_moderation",
      "chatgpt_enable_message_logging",
      "chatgpt_minimum_confidence_score",
      "chatgpt_cool_down_in_seconds",
      "chatgpt_fallback_message",
      "chatgpt_enable_security_instructions",
    ],
    { file: confFile },
    cb,
  );
}

/**
 * Execute Minecraft NPC CLI.
 */
function exec() {
  const actions = {
    commands: {
      start: { action: _start },
    },
  };

  bag.command(DIRNAME, actions);
}

const exports = {
  exec: exec,
};

export { exports as default };
