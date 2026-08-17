"use strict";
import SneakAction from "../../lib/actions/sneak.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SneakAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SneakAction", async () => {
    const sneak = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SneakAction({
      sneak,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({ message: "sneak", messageElems: ["sneak"], player: "alice" });
    assert.equals(sneak.firstCall.args[0], true);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
