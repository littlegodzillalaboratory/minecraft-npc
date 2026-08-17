"use strict";
import TellJokeAction from "../../lib/actions/tell-joke.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("TellJokeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run TellJokeAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new TellJokeAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "tell me a joke",
      messageElems: ["tell me a joke"],
      player: "alice",
    });
    assert.equals(sayMessage.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
