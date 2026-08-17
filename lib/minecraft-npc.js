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

/**
 * class MinecraftNpc
 *
 * @param {Object} opts: optional
 */
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

  /**
   */
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
      minimumConfidenceScore: _opts.chatGptMinimumConfidenceScore,
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

    _bot.on("kicked", function (error, result) {
      bag.logStepHeading("Bot has been kicked:");
      cb(error, result);
    });
    _bot.on("error", function (error, result) {
      bag.logStepHeading("An unexpected error has occurred:");
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

      _bot.on("chat", (username, message) => {
        // Ignore message from the bot itself
        if (username === _bot.username) {
          return;
        } else {
          if (message.startsWith(_bot.username)) {
            const sanitisedMessage = message
              .slice(_bot.username.length)
              .trimStart();
            respondToMessageAction.do({
              message: sanitisedMessage,
              sender: username,
            });

            // Ignore message not addressed to the bot
            // (assumes bot is addressed if message starts with the bot's username)
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
