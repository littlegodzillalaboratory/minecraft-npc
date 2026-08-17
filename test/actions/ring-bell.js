"use strict";
import RingBellAction from "../../lib/actions/ring-bell.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("RingBellAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run RingBellAction", async () => {
    const activateBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new RingBellAction({
      activateBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "ring the bell",
      messageElems: ["ring the bell"],
      player: "alice",
    });
    assert.equals(activateBlock.firstCall.args[0], "bell");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
