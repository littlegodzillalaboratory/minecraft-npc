"use strict";
import MineBlockAction from "../../lib/actions/mine-block.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MineBlockAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MineBlockAction", async () => {
    const collectBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new MineBlockAction({
      collectBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "mine some coal",
      messageElems: ["mine some coal", "coal"],
      player: "alice",
    });
    assert.equals(collectBlock.firstCall.args[0], "coal");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
