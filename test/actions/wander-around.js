"use strict";
import WanderAroundAction from "../../lib/actions/wander-around.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("WanderAroundAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run WanderAroundAction", async () => {
    const wander = sinon.stub().resolves({
      status: "success",
      value: { posX: 1, posY: 2, posZ: 3 },
    });
    const moveToLocation = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new WanderAroundAction({
      wander,
      moveToLocation,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "wander around",
      messageElems: ["wander around"],
      player: "alice",
    });
    assert.equals(wander.callCount, 1);
    assert.equals(moveToLocation.firstCall.args, [1, 2, 3]);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
