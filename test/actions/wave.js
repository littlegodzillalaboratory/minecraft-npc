"use strict";
import WaveAction from "../../lib/actions/wave.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("WaveAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run WaveAction", async () => {
    const swingArm = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new WaveAction({
      swingArm,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "wave",
      messageElems: ["wave"],
      player: "alice",
    });
    assert.equals(swingArm.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
