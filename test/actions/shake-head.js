"use strict";
import ShakeHeadAction from "../../lib/actions/shake-head.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ShakeHeadAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ShakeHeadAction", async () => {
    const gesture = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ShakeHeadAction({
      gesture,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "shake your head",
      messageElems: ["shake your head"],
      player: "alice",
    });
    assert.equals(gesture.firstCall.args[0], "shake");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
