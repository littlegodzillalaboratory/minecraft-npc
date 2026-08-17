"use strict";
import BackAwayAction from "../../lib/actions/back-away.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("BackAwayAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run BackAwayAction", async () => {
    const moveBlocksDistanceToDirection = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new BackAwayAction({
      moveBlocksDistanceToDirection,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "back away",
      messageElems: ["back away"],
      player: "alice",
    });
    assert.equals(moveBlocksDistanceToDirection.firstCall.args[0], 5);
    assert.equals(moveBlocksDistanceToDirection.firstCall.args[1], "backward");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
