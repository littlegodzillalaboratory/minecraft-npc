"use strict";
import EmptyChestAction from "../../lib/actions/empty-chest.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EmptyChestAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run EmptyChestAction", async () => {
    const withdrawAllFromChest = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new EmptyChestAction({
      withdrawAllFromChest,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "empty the chest",
      messageElems: ["empty the chest"],
      player: "alice",
    });
    assert.equals(withdrawAllFromChest.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
