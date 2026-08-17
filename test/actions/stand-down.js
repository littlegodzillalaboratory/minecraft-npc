"use strict";
import StandDownAction from "../../lib/actions/stand-down.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("StandDownAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run StandDownAction", async () => {
    const stop = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new StandDownAction({
      stop,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "stand down",
      messageElems: ["stand down"],
      player: "alice",
    });
    assert.equals(stop.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
