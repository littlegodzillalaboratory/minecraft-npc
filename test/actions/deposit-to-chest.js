"use strict";
import DepositToChestAction from "../../lib/actions/deposit-to-chest.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DepositToChestAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run DepositToChestAction", async () => {
    const depositToChest = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new DepositToChestAction({
      depositToChest,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "put your items in the chest",
      messageElems: ["put your items in the chest"],
      player: "alice",
    });
    assert.equals(depositToChest.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
