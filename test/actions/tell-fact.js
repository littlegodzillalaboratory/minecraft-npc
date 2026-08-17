"use strict";
import TellFactAction from "../../lib/actions/tell-fact.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("TellFactAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run TellFactAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new TellFactAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "tell me a fact",
      messageElems: ["tell me a fact"],
      player: "alice",
    });
    assert.equals(sayMessage.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
