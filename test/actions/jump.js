"use strict";
import JumpAction from "../../lib/actions/jump.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("JumpAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run JumpAction", async () => {
    const jump = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new JumpAction({
      jump,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({ message: "jump", messageElems: ["jump"], player: "alice" });
    assert.equals(jump.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
