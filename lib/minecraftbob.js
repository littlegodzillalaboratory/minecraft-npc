"use strict"
import bag from 'bagofcli';
import mineflayer from 'mineflayer';
import { readFile } from 'fs/promises';
import mineflayerViewer from 'prismarine-viewer'

/**
 * class MinecraftBob
 *
 * @param {String} opts: optional
 */
class MinecraftBob {
  
  constructor(opts) {
    this.host = opts.host || 'localhost';
    this.port = opts.port || 25565;
    this.viewerPort = opts.viewerPort || 3000;
    this.username = opts.username || 'bob';
    this.password = opts.password || undefined;
  }

  /**
   */
  async start(cb) {

    const version = await this._getVersion();
    bag.logStepHeading(`Starting Minecraft Bob v${version}...`);

    const bot = mineflayer.createBot({
      host: this.host,
      username: this.username,
      password: this.password,
      port: this.port
    });

    bag.logStepHeading('Loading plugins...');

    const self = this;
    
    bag.logStepHeading('Spawning bot...');
    bot.once('spawn', () => {

      bag.logStepItemSuccess(`${bot.username} has been spawned`);

      mineflayerViewer.mineflayer(bot, { port: self.viewerPort, firstPerson: false })
  
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
  MinecraftBob as default
};