"use strict";
import StopCurrentAction from "../../lib/actions/stop-current-action.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("StopCurrentAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run StopCurrentAction", () => {
    const stop = sinon.stub().returns("success");
    const action = new StopCurrentAction({
      stop,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({});
    assert.equals(stop.callCount, 1);
  });
});
