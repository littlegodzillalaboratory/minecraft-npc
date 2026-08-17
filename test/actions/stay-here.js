"use strict";
import StayHereAction from "../../lib/actions/stay-here.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("StayHereAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run StayHereAction", async () => {
    const stop = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new StayHereAction({
      stop,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "stay here",
      messageElems: ["stay here"],
      player: "alice",
    });
    assert.equals(stop.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
