"use strict";
import GreetAction from "../../lib/actions/greet.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("GreetAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run GreetAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new GreetAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "hello",
      messageElems: ["hello"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "Hello alice! Nice to see you.",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
