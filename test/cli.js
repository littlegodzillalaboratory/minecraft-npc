"use strict"
/* eslint no-unused-vars: 0 */
import MinecraftBob from '../lib/minecraftbob.js';
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

  it('should contain start command and delegate to minecraftbob start when exec is called', function (done) {
    // this.mockBag.expects('logStepHeading').withExactArgs('Creating example AE86 project');
    sinon.stub(bag, 'command').value(function (base, actions) {
      actions.commands.start.action({
        host: 'localhost',
        port: 25565,
        viewerPort: 3000,
        username: 'someuser',
        password: 's0m3p4ss'
      });
    });
    sinon.stub(MinecraftBob.prototype, 'start').value(function (cb) {
      assert.equals(typeof cb, 'function');
      done();
    });
    cli.exec();
  });
});