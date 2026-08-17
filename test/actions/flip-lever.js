"use strict";
import FlipLeverAction from "../../lib/actions/flip-lever.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FlipLeverAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FlipLeverAction", async () => {
    const activateBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FlipLeverAction({
      activateBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "flip the lever",
      messageElems: ["flip the lever"],
      player: "alice",
    });
    assert.equals(activateBlock.firstCall.args[0], "lever");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
