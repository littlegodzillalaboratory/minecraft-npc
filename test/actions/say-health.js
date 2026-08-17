"use strict";
import SayHealthAction from "../../lib/actions/say-health.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayHealthAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayHealthAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayHealthAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ health: 18 }),
    });
    await action.do({
      message: "health check",
      messageElems: ["health check"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "My health is 18 out of 20");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
