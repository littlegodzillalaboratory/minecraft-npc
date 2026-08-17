"use strict";
import FishAction from "../../lib/actions/fish.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FishAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FishAction", async () => {
    const fish = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FishAction({
      fish,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "go fishing",
      messageElems: ["go fishing"],
      player: "alice",
    });
    assert.equals(fish.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
