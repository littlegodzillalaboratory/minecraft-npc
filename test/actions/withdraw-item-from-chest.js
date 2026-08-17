"use strict";
import WithdrawItemFromChestAction from "../../lib/actions/withdraw-item-from-chest.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("WithdrawItemFromChestAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run WithdrawItemFromChestAction", async () => {
    const withdrawFromChest = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new WithdrawItemFromChestAction({
      withdrawFromChest,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "take the bread from the chest",
      messageElems: ["take the bread from the chest", "bread"],
      player: "alice",
    });
    assert.equals(withdrawFromChest.firstCall.args[0], "bread");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
