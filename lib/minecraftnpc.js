"use strict"
import bag from 'bagofcli';
import mineflayer from 'mineflayer';
import pathfinder from 'mineflayer-pathfinder';
import { readFile } from 'fs/promises';
import mineflayerViewer from 'prismarine-viewer'

/**
 * class MinecraftNpc
 *
 * @param {String} opts: optional
 */
class MinecraftNpc {
  
  constructor(opts) {
    this.host = opts.host || 'localhost';
    this.port = opts.port || 25565;
    this.viewerPort = opts.viewerPort || 3000;
    this.username = opts.username || 'bob';
    this.password = opts.password || undefined;
    this.initCoords = opts.initCoords || [0, 0, 0];
  }

  /**
   */
  async start(cb) {

    const version = await this._getVersion();
    bag.logStepHeading(`Starting Minecraft NPC v${version}...`);

    const bot = mineflayer.createBot({
      host: this.host,
      username: this.username,
      password: this.password,
      port: this.port
    });

    bag.logStepHeading('Loading plugins...');

    bag.logStepItemSuccess('Pathfinder plugin');
    bot.loadPlugin(pathfinder.pathfinder);

    const self = this;
    
    bag.logStepHeading('Spawning bot...');
    bot.once('spawn', () => {

      bag.logStepItemSuccess(`${bot.username} has been spawned`);

      mineflayerViewer.mineflayer(bot, { port: self.viewerPort, firstPerson: false })

      const defaultMovement = new pathfinder.Movements(bot);
      bot.pathfinder.setMovements(defaultMovement);

      const [coordX, coordY, coordZ] = self.initCoords;
      bot.pathfinder.setGoal(new pathfinder.goals.GoalNear(coordX, coordY, coordZ, 1));

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