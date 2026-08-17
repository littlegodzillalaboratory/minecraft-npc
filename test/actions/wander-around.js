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
    const wander = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new WanderAroundAction({
      wander,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "wander around",
      messageElems: ["wander around"],
      player: "alice",
    });
    assert.equals(wander.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
