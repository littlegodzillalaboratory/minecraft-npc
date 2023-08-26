"use strict"
import bag from 'bagofcli';
import MinecraftBob from './minecraftbob.js';
import p from 'path';

const DIRNAME = p.dirname(import.meta.url).replace('file://', '');

function _start(args) {

  const opts = {
    host: args.host,
    port: args.port,
    viewerPort: args.viewerPort,
    username: args.username,
    password: args.password
  };

  const minecraftBob = new MinecraftBob(opts);
  minecraftBob.start(bag.exit);
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