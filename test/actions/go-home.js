"use strict";
import GoHomeAction from "../../lib/actions/go-home.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("GoHomeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run GoHomeAction", async () => {
    const moveToLocation = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new GoHomeAction({
      moveToLocation,
      getRegister: () => ({ setActionInfo }),
      getOpts: () => ({ initCoords: [1, 2, 3] }),
    });
    await action.do({
      message: "go home",
      messageElems: ["go home"],
      player: "alice",
    });
    assert.equals(moveToLocation.firstCall.args[0], 1);
    assert.equals(moveToLocation.firstCall.args[1], 2);
    assert.equals(moveToLocation.firstCall.args[2], 3);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should default to origin when no init coords are configured", async () => {
    const moveToLocation = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new GoHomeAction({
      moveToLocation,
      getRegister: () => ({ setActionInfo }),
      getOpts: () => ({}),
    });
    await action.do({
      message: "go home",
      messageElems: ["go home"],
      player: "alice",
    });
    assert.equals(moveToLocation.firstCall.args[0], 0);
    assert.equals(moveToLocation.firstCall.args[1], 0);
    assert.equals(moveToLocation.firstCall.args[2], 0);
  });
});
