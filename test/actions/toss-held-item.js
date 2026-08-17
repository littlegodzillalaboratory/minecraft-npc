"use strict";
import TossHeldItemAction from "../../lib/actions/toss-held-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("TossHeldItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run TossHeldItemAction", async () => {
    const tossHeldItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new TossHeldItemAction({
      tossHeldItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "toss that",
      messageElems: ["toss that"],
      player: "alice",
    });
    assert.equals(tossHeldItem.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
