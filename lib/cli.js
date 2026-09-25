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
        chatGptMessageApiKey:
          result.chatgpt_message_apikey || process.env.CHATGPT_MESSAGE_API_KEY,
        chatGptModerationApiKey:
          result.chatgpt_moderation_apikey ||
          process.env.CHATGPT_MODERATION_API_KEY,
        chatGptMessageBaseUrl:
          result.chatgpt_message_base_url ||
          process.env.CHATGPT_MESSAGE_BASE_URL,
        chatGptModel: result.chatgpt_model,
        chatGptInstructions: result.chatgpt_instructions,
        chatGptEnableModeration: result.chatgpt_enable_moderation,
        chatGptEnableMessageLogging: result.chatgpt_enable_message_logging,
        chatGptMinimumReplyConfidenceScore:
          result.chatgpt_minimum_reply_confidence_score,
        chatGptMinimumJailbreakConfidenceScore:
          result.chatgpt_minimum_jailbreak_confidence_score,
        chatGptCoolDownInSeconds: result.chatgpt_cool_down_in_seconds,
        chatGptFallbackMessage: result.chatgpt_fallback_message,
        chatGptEnableSecurityInstructions:
          result.chatgpt_enable_security_instructions,
        autoModeEnabled: result.auto_mode_enabled,
        autoModeEngine: result.auto_mode_engine,
        autoModeEvaluationIntervalInSeconds:
          result.auto_mode_evaluation_interval_in_seconds,
        autoModeHungerThreshold: result.auto_mode_hunger_threshold,
        autoModeMinimumFoodReserve: result.auto_mode_minimum_food_reserve,
        autoModeFleeHealthThreshold: result.auto_mode_flee_health_threshold,
        autoModeAllowedHuntAnimals: result.auto_mode_allowed_hunt_animals,
        autoModeMaximumHuntingDistance:
          result.auto_mode_maximum_hunting_distance,
        autoModeThreatRadius: result.auto_mode_threat_radius,
        autoModeHomeRadius: result.auto_mode_home_radius,
        autoModeSleepRetryCooldownInSeconds:
          result.auto_mode_sleep_retry_cooldown_in_seconds,
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
      "chatgpt_message_apikey",
      "chatgpt_moderation_apikey",
      "chatgpt_message_base_url",
      "chatgpt_model",
      "chatgpt_instructions",
      "chatgpt_enable_moderation",
      "chatgpt_enable_message_logging",
      "chatgpt_minimum_reply_confidence_score",
      "chatgpt_minimum_jailbreak_confidence_score",
      "chatgpt_cool_down_in_seconds",
      "chatgpt_fallback_message",
      "chatgpt_enable_security_instructions",
      "auto_mode_enabled",
      "auto_mode_engine",
      "auto_mode_evaluation_interval_in_seconds",
      "auto_mode_hunger_threshold",
      "auto_mode_minimum_food_reserve",
      "auto_mode_flee_health_threshold",
      "auto_mode_allowed_hunt_animals",
      "auto_mode_maximum_hunting_distance",
      "auto_mode_threat_radius",
      "auto_mode_home_radius",
      "auto_mode_sleep_retry_cooldown_in_seconds",
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
