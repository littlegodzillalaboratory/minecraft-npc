"use strict"
import bag from 'bagofcli';
import MinecraftNpc from './minecraftnpc.js';
import p from 'path';

const DIRNAME = p.dirname(import.meta.url).replace('file://', '');

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
        initMessage: result.init_message
      };

      const minecraftNpc = new MinecraftNpc(opts);
      minecraftNpc.start(bag.exit);
    }
  }

  const confFile = args.confFile || 'minecraftnpc.yaml';
  bag.lookupConfig(
    ['host', 
     'port',
     'version',
     'viewer_port',
     'web_inventory_port',
     'username',
     'password',
     'init_coords',
     'init_message'],
    { file: confFile }, 
    cb
  )
}

/**
 * Execute Minecraft Bob CLI.
 */
function exec() {

  const actions = {
    commands: {
      start: { action: _start }
    }
  };

  bag.command(DIRNAME, actions);
}

const exports = {
  exec: exec
};

export {
  exports as default
};