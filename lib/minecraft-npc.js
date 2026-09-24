"use strict";
import bag from "bagofcli";
import mineflayer from "mineflayer";
import mineflayerChatgpt from "mineflayer-chatgpt";
import pathfinder from "mineflayer-pathfinder";
import mineflayerWebInventory from "mineflayer-web-inventory";
import { readFile } from "fs/promises";
import mineflayerViewer from "prismarine-viewer";
import Npc from "./npc.js";
import pvp from "mineflayer-pvp";
import Register from "./register.js";
import MoveToInitLocationAction from "./actions/move-to-init-location.js";
import RespondToMessageAction from "./actions/respond-to-message.js";
import SayInitMessageAction from "./actions/say-init-message.js";

/** Configure and run the Mineflayer-backed NPC. */
class MinecraftNpc {
  constructor(opts) {
    const bot = mineflayer.createBot({
      host: opts.host || "localhost",
      port: opts.port || 25565,
      version: opts.version,
      username: opts.username || "bob",
      password: opts.password || undefined,
    });

    const register = new Register();

    this.npc = new Npc(bot, register, opts);
  }

  /** Load plugins and start handling addressed chat messages after spawning. */
  async start(cb) {
    const minecraftNpcVersion = await this._getMinecraftNpcVersion();
    bag.logStepHeading(`Starting Minecraft NPC v${minecraftNpcVersion}...`);

    const _bot = this.npc.getBot();
    const _opts = this.npc.getOpts();

    bag.logStepHeading("Loading plugins...");
    bag.logStepItemSuccess("ChatGPT plugin");
    _bot.loadPlugin(mineflayerChatgpt.chatgpt);
    _bot.chatgpt.setConfig({
      messageApiKey: _opts.chatGptMessageApiKey,
      moderationApiKey: _opts.chatGptModerationApiKey,
      messageBaseURL: _opts.chatGptMessageBaseUrl,
      model: _opts.chatGptModel,
      instructions: _opts.chatGptInstructions,
      enableModeration: _opts.chatGptEnableModeration,
      enableMessageLogging: _opts.chatGptEnableMessageLogging,
      minimumReplyConfidenceScore: _opts.chatGptMinimumConfidenceScore,
      coolDownInSeconds: _opts.chatGptCoolDownInSeconds,
      fallbackMessage: _opts.chatGptFallbackMessage,
      enableSecurityInstructions: _opts.chatGptEnableSecurityInstructions,
    });
    bag.logStepItemSuccess("Pathfinder plugin");
    _bot.loadPlugin(pathfinder.pathfinder);
    bag.logStepItemSuccess("PVP plugin");
    _bot.loadPlugin(pvp.plugin);
    bag.logStepItemSuccess("Viewer plugin");
    bag.logStepItemSuccess("WebInventory plugin");

    const moveToInitLocationAction = new MoveToInitLocationAction(this.npc);
    const respondToMessageAction = new RespondToMessageAction(this.npc);
    const sayInitMessageAction = new SayInitMessageAction(this.npc);

    _bot.on("kicked", (error, result) => {
      bag.logStepHeading("Bot has been kicked:");
      void this.npc.disableAutoMode();
      cb(error, result);
    });
    _bot.on("error", (error, result) => {
      bag.logStepHeading("An unexpected error has occurred:");
      void this.npc.disableAutoMode();
      cb(error, result);
    });

    bag.logStepHeading("Spawning bot...");
    _bot.once("spawn", () => {
      bag.logStepItemSuccess(`${_bot.username} has been spawned`);

      mineflayerViewer.mineflayer(_bot, {
        port: _opts.viewerPort,
        firstPerson: false,
      });
      mineflayerWebInventory(_bot, { port: _opts.webInventoryPort });

      const [posX, posY, posZ] = _opts.initCoords;
      moveToInitLocationAction.do({
        posX: posX,
        posY: posY,
        posZ: posZ,
      });

      sayInitMessageAction.do({
        messages: _opts.initMessages,
      });

      if (_opts.autoModeEnabled) {
        this.npc.enableAutoMode();
      }

      _bot.on("chat", (username, message) => {
        // Ignore the NPC's own chat to prevent reply loops.
        if (username === _bot.username) {
          return;
        } else {
          if (message.startsWith(_bot.username)) {
            const sanitisedMessage = message
              .trim()
              .slice(_bot.username.length)
              .replace(/^:\s*/, "")
              .trim();
            respondToMessageAction.do({
              message: sanitisedMessage,
              sender: username,
            });

            // Messages are commands only when prefixed with the NPC username.
          } else {
            return;
          }
        }
      });
    });
  }

  async _getMinecraftNpcVersion() {
    const packageInfo = JSON.parse(
      await readFile(new URL("../package.json", import.meta.url)),
    );
    return packageInfo["version"];
  }
}

export { MinecraftNpc as default };
