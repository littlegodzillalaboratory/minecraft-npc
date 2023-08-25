"use strict"
/* eslint no-unused-vars: 0 */
import AE86 from '../lib/ae86.js';
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