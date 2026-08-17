"use strict";
import MoveToCoordinatesAction from "../../lib/actions/move-to-coordinates.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MoveToCoordinatesAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MoveToCoordinatesAction", async () => {
    const moveToLocation = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new MoveToCoordinatesAction({
      moveToLocation,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "go to 10 64 -20",
      messageElems: ["go to 10 64 -20", "10", "64", "-20"],
      player: "alice",
    });
    assert.equals(moveToLocation.firstCall.args[0], 10);
    assert.equals(moveToLocation.firstCall.args[1], 64);
    assert.equals(moveToLocation.firstCall.args[2], -20);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
