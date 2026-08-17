"use strict";
import FleeAction from "../../lib/actions/flee.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FleeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FleeAction", async () => {
    const flee = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FleeAction({
      flee,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "run away",
      messageElems: ["run away"],
      player: "alice",
    });
    assert.equals(flee.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
