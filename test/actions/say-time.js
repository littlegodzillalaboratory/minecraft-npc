"use strict";
import SayTimeAction from "../../lib/actions/say-time.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayTimeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayTimeAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayTimeAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ time: { timeOfDay: 14000 } }),
    });
    await action.do({
      message: "what time is it",
      messageElems: ["what time is it"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "The time of day is 14000, it is night time",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say it is day time outside the night range", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayTimeAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ time: { timeOfDay: 6000 } }),
    });
    await action.do({
      message: "what time is it",
      messageElems: ["what time is it"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "The time of day is 6000, it is day time",
    );
  });
});
