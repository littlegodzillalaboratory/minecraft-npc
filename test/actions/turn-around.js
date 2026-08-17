"use strict";
import TurnAroundAction from "../../lib/actions/turn-around.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("TurnAroundAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run TurnAroundAction", async () => {
    const faceDirection = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new TurnAroundAction({
      faceDirection,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "turn around",
      messageElems: ["turn around"],
      player: "alice",
    });
    assert.equals(faceDirection.firstCall.args[0], "around");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
