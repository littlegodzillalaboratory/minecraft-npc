"use strict";
import SleepAction from "../../lib/actions/sleep.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SleepAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SleepAction", async () => {
    const sleep = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SleepAction({
      sleep,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({});
    assert.equals(sleep.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
