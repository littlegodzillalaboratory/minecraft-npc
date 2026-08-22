"use strict";
import DanceAction from "../../lib/actions/dance.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DanceAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run DanceAction", async () => {
    const dance = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new DanceAction({
      dance,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "dance",
      messageElems: ["dance"],
      player: "alice",
    });
    assert.equals(dance.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
