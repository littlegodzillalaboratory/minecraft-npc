"use strict";
import UnequipItemAction from "../../lib/actions/unequip-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("UnequipItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run UnequipItemAction", async () => {
    const unequipItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new UnequipItemAction({
      unequipItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "put that away",
      messageElems: ["put that away"],
      player: "alice",
    });
    assert.equals(unequipItem.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
