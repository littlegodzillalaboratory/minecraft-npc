"use strict";
import SayActionCountAction from "../../lib/actions/say-action-count.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayActionCountAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayActionCountAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayActionCountAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getRegister: () => ({
        setActionInfo,
        getLatestAction: () => ({ id: "EatAction", counter: 3 }),
      }),
    });
    await action.do({
      message: "what have you been up to",
      messageElems: ["what have you been up to"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "I have performed 3 actions so far",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
