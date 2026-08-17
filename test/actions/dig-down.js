"use strict";
import DigDownAction from "../../lib/actions/dig-down.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DigDownAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run DigDownAction", async () => {
    const digBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new DigDownAction({
      digBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "dig down",
      messageElems: ["dig down"],
      player: "alice",
    });
    assert.equals(digBlock.firstCall.args[0], "below");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
