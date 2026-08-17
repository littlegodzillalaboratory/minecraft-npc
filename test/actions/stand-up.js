"use strict";
import StandUpAction from "../../lib/actions/stand-up.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("StandUpAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run StandUpAction", async () => {
    const sneak = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new StandUpAction({
      sneak,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "stand up",
      messageElems: ["stand up"],
      player: "alice",
    });
    assert.equals(sneak.firstCall.args[0], false);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
