"use strict";
import MineTargetBlockAction from "../../lib/actions/mine-target-block.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MineTargetBlockAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MineTargetBlockAction", async () => {
    const digBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new MineTargetBlockAction({
      digBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "mine that block",
      messageElems: ["mine that block"],
      player: "alice",
    });
    assert.equals(digBlock.firstCall.args[0], "cursor");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
