"use strict";
import MoveToInitLocationAction from "../../lib/actions/move-to-init-location.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MoveToInitLocationAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MoveToInitLocationAction", () => {
    const moveToLocation = sinon.stub().returns("success");
    const action = new MoveToInitLocationAction({
      moveToLocation,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({ posX: 5, posY: 6, posZ: 7 });
    assert.equals(moveToLocation.firstCall.args[0], 5);
    assert.equals(moveToLocation.firstCall.args[1], 6);
    assert.equals(moveToLocation.firstCall.args[2], 7);
  });
});
