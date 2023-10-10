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
        viewerPort: result.viewer_port,
        username: result.username,
        password: result.password,
        initCoords: result.init_coords
      };

      const minecraftNpc = new MinecraftNpc(opts);
      minecraftNpc.start(bag.exit);
    }
  }

  const confFile = args.confFile || 'minecraftnpc.yaml';
  bag.lookupConfig(
    ['host', 'port', 'viewer_port', 'username', 'password', 'init_coords'],
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