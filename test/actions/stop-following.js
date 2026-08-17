"use strict";
import StopFollowingAction from "../../lib/actions/stop-following.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("StopFollowingAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run StopFollowingAction", async () => {
    const stop = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new StopFollowingAction({
      stop,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "stop following",
      messageElems: ["stop following"],
      player: "alice",
    });
    assert.equals(stop.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
