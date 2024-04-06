"use strict"
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

      assert.deepStrictEqual(register.actions[id], {
        status: status,
        counter: 1
      });
      assert.deepStrictEqual(register.latestAction, {
        id: id,
        status: status,
        counter: 1
      });
    });

    it('should update action info correctly', () => {
      const id = '123';
      const status = 'success';

      register.setActionInfo(id, status);
      register.setActionInfo(id, 'failure');

      assert.deepStrictEqual(register.actions[id], {
        status: 'failure',
        counter: 2
      });
      assert.deepStrictEqual(register.latestAction, {
        id: id,
        status: 'failure',
        counter: 2
      });
    });
  });

  describe('getActionInfo', () => {
    it('should return undefined for non-existent action', () => {
      assert.strictEqual(register.getActionInfo('123'), undefined);
    });

    it('should return action info correctly', () => {
      const id = '123';
      const status = 'success';

      register.setActionInfo(id, status);

      assert.deepStrictEqual(register.getActionInfo(id), {
        status: status,
        counter: 1
      });
    });
  });

  describe('getLatestAction', () => {
    it('should return undefined for no actions', () => {
      assert.strictEqual(register.getLatestAction(), undefined);
    });

    it('should return latest action correctly', () => {
      const id1 = '123';
      const status1 = 'success';

      const id2 = '456';
      const status2 = 'failure';

      register.setActionInfo(id1, status1);
      register.setActionInfo(id2, status2);

      assert.deepStrictEqual(register.getLatestAction(), {
        id: id2,
        status: status2,
        counter: 1
      });
    });
  });
});