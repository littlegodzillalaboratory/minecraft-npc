"use strict";
import Register from '../lib/register.js';
import referee from '@sinonjs/referee';
const assert = referee.assert;

describe('Register', () => {
  let register;

  beforeEach(() => {
    register = new Register();
  });

  describe('setActionInfo', () => {
    it('should set action info correctly', () => {
      const id = '123';
      const status = 'success';

      register.setActionInfo(id, status);

      assert.equals(register.actions[id].status, 'success');
      assert.equals(register.actions[id].counter, 1);
      assert.isNumber(register.actions[id].timeInMillis);
      assert.equals(register.latestAction.id, '123');
      assert.equals(register.latestAction.status, 'success');
      assert.equals(register.latestAction.counter, 1);
      assert.isNumber(register.latestAction.timeInMillis);
    });

    it('should update action info correctly', () => {
      const id = '123';
      const status = 'success';

      register.setActionInfo(id, status);
      register.setActionInfo(id, 'failure');

      assert.equals(register.actions[id].status, 'failure');
      assert.equals(register.actions[id].counter, 2);
      assert.isNumber(register.actions[id].timeInMillis);
      assert.equals(register.latestAction.id, '123');
      assert.equals(register.latestAction.status, 'failure');
      assert.equals(register.latestAction.counter, 2);
      assert.isNumber(register.latestAction.timeInMillis);
    });
  });

  describe('getActionInfo', () => {
    it('should return undefined for non-existent action', () => {
      assert.same(register.getActionInfo('123'), undefined);
    });

    it('should return action info correctly', () => {
      const id = '123';
      const status = 'success';

      register.setActionInfo(id, status);

      assert.equals(register.actions[id].status, 'success');
      assert.equals(register.actions[id].counter, 1);
      assert.isNumber(register.actions[id].timeInMillis);
    });
  });

  describe('getLatestAction', () => {
    it('should return undefined for no actions', () => {
      assert.same(register.getLatestAction(), undefined);
    });

    it('should return latest action correctly', () => {
      const id1 = '123';
      const status1 = 'success';

      const id2 = '456';
      const status2 = 'failure';

      register.setActionInfo(id1, status1);
      register.setActionInfo(id2, status2);

      assert.equals(register.latestAction.id, '456');
      assert.equals(register.latestAction.status, 'failure');
      assert.equals(register.latestAction.counter, 2);
      assert.isNumber(register.latestAction.timeInMillis);
    });
  });
});