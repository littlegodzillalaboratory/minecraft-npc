"use strict";
import SayInitMessageAction from "../../lib/actions/say-init-message.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayInitMessageAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayInitMessageAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const action = new SayInitMessageAction({
      sayMessage,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    await action.do({ messages: ["a", "b"] });
    assert.equals(sayMessage.callCount, 1);
  });
});
