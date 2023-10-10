"use strict"
/* eslint no-unused-vars: 0 */
import MinecraftNpc from '../lib/minecraftnpc.js';
import bag from 'bagofcli';
import cli from '../lib/cli.js';
import referee from '@sinonjs/referee';
import sinon from 'sinon';
const assert = referee.assert;

describe('cli - exec', function() {

  it('should contain commands with actions', function (done) {
    const mockCommand = function (base, actions) {
      assert.isString(base);
      assert.isFunction(actions.commands.start.action);
      done();
    };
    sinon.stub(bag, 'command').value(mockCommand);
    cli.exec();
  });
});

describe('cli - start', function() {

  beforeEach(function () {
    this.mockBag = sinon.mock(bag);
  });

  afterEach(function () {
    this.mockBag.verify();
    this.mockBag.restore();
  });

  it('should contain start command and delegate to minecraftnpc start when exec is called', function (done) {
    // this.mockBag.expects('logStepHeading').withExactArgs('Creating example AE86 project');
    sinon.stub(bag, 'lookupConfig').value(function (keys, opts, cb) {
      assert.equals(keys, ['host', 'port', 'viewer_port', 'username', 'password', 'init_coords']);
      assert.equals(opts.file, 'someconffile.yaml');
      cb(null, {
        host: 'localhost',
        port: 25565,
        viewer_port: 3000,
        username: 'bob',
        password: undefined,
        init_coords: [0, 0, 0]
      });
    });
    sinon.stub(bag, 'command').value(function (base, actions) {
      actions.commands.start.action({
        confFile: 'someconffile.yaml'
      });
    });
    sinon.stub(MinecraftNpc.prototype, 'start').value(function (cb) {
      assert.equals(typeof cb, 'function');
      done();
    });
    cli.exec();
  });
});