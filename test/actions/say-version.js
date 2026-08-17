"use strict";
import SayVersionAction from "../../lib/actions/say-version.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayVersionAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayVersionAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayVersionAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ version: "1.20.4" }),
    });
    await action.do({
      message: "what version are you running",
      messageElems: ["what version"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "I am running Minecraft version 1.20.4",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
