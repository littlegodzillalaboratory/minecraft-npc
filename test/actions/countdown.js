"use strict";
import CountdownAction from "../../lib/actions/countdown.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CountdownAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run CountdownAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new CountdownAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "countdown from 3",
      messageElems: ["countdown from 3", "3"],
      player: "alice",
    });
    assert.equals(sayMessage.callCount, 4);
    assert.equals(sayMessage.lastCall.args[0], "Go!");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should default count to 5 when not specified", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new CountdownAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "countdown",
      messageElems: ["countdown"],
      player: "alice",
    });
    assert.equals(sayMessage.callCount, 6);
  });
});
