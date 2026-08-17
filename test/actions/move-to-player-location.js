"use strict";
import MoveToPlayerLocationAction from "../../lib/actions/move-to-player-location.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MoveToPlayerLocationAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MoveToPlayerLocationAction", async () => {
    const moveToLocation = sinon.stub().resolves("success");
    const action = new MoveToPlayerLocationAction({
      getPlayerPosition: () => ({ x: 11, y: 12, z: 13 }),
      moveToLocation,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    await action.do({ player: "alice" });
    assert.equals(moveToLocation.firstCall.args[0], 11);
    assert.equals(moveToLocation.firstCall.args[1], 12);
    assert.equals(moveToLocation.firstCall.args[2], 13);
  });
});
