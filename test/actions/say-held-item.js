"use strict";
import SayHeldItemAction from "../../lib/actions/say-held-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayHeldItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayHeldItemAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayHeldItemAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ heldItem: { name: "torch" } }),
    });
    await action.do({
      message: "what are you holding",
      messageElems: ["what are you holding"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I am holding torch");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
