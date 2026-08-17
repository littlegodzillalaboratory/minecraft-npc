"use strict";
import ChopTreeAction from "../../lib/actions/chop-tree.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ChopTreeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ChopTreeAction", async () => {
    const collectBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ChopTreeAction({
      collectBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "chop a tree",
      messageElems: ["chop a tree"],
      player: "alice",
    });
    assert.equals(collectBlock.firstCall.args[0], "_log");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
