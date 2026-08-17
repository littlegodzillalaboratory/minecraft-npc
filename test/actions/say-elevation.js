"use strict";
import SayElevationAction from "../../lib/actions/say-elevation.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayElevationAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayElevationAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayElevationAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getPosition: () => ({ x: 0, y: 64.4, z: 0 }),
    });
    await action.do({
      message: "how high are you",
      messageElems: ["how high are you"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I am at elevation 64");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
