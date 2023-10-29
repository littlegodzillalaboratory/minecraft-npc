"use strict"
import bag from 'bagofcli';
import mineflayer from 'mineflayer';
import pathfinder from 'mineflayer-pathfinder';
import mineflayerWebInventory from 'mineflayer-web-inventory';
import { readFile } from 'fs/promises';
import mineflayerViewer from 'prismarine-viewer'
import Register from './register.js';
import MoveInitLocation from './actions/move-init-location.js';
import SayInitMessage from './actions/say-init-message.js';

/**
 * class MinecraftNpc
 *
 * @param {Object} opts: optional
 */
class MinecraftNpc {
  
  constructor(opts) {

    this.host = opts.host || 'localhost';
    this.port = opts.port || 25565;
    this.version = opts.version;
    this.viewerPort = opts.viewerPort || 3000;
    this.webInventoryPort = opts.webInventoryPort || 3001;
    this.username = opts.username || 'bob';
    this.password = opts.password || undefined;
    this.initCoords = opts.initCoords || [0, 0, 0];
    this.initMessages = opts.initMessages;

    this.register = new Register();
  }

  /**
   */
  async start(cb) {

    const version = await this._getVersion();
    bag.logStepHeading(`Starting Minecraft NPC v${version}...`);

    const bot = mineflayer.createBot({
      host: this.host,
      port: this.port,
      version: this.version,
      username: this.username,
      password: this.password
    });

    bag.logStepHeading('Loading plugins...');

    bag.logStepItemSuccess('Pathfinder plugin');
    bot.loadPlugin(pathfinder.pathfinder);

    bag.logStepItemSuccess('Viewer plugin');
    bag.logStepItemSuccess('WebInventory plugin');

    const self = this;
    
    bag.logStepHeading('Spawning bot...');
    bot.once('spawn', () => {

      bag.logStepItemSuccess(`${bot.username} has been spawned`);

      mineflayerViewer.mineflayer(bot, { port: self.viewerPort, firstPerson: false });

      mineflayerWebInventory(bot, { port: self.webInventoryPort });

      const [coordX, coordY, coordZ] = self.initCoords;
      new MoveInitLocation(self.register, bot).do({
        coordX: coordX,
        coordY: coordY,
        coordZ: coordZ
      });

      new SayInitMessage(self.register, bot).do({
        messages: self.initMessages
      });

      bot.on('kicked', console.log);
      bot.on('error', cb);
    });
  }

  async _getVersion() {
    const packageInfo = JSON.parse(
      await readFile (
        new URL('../package.json', import.meta.url)
      )
    );
    return packageInfo['version'];
  }
}

export {
  MinecraftNpc as default
};