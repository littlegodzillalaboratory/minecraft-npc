"use strict";
import SayUptimeAction from "../../lib/actions/say-uptime.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayUptimeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayUptimeAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayUptimeAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "what is your uptime",
      messageElems: ["what is your uptime"],
      player: "alice",
    });
    assert.equals(sayMessage.callCount, 1);
    assert.match(
      sayMessage.firstCall.args[0],
      /I have been online for about \d+ minutes/,
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
