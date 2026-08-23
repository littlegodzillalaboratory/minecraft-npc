"use strict";
import SayLatestActionAction from "../../lib/actions/say-latest-action.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayLatestActionAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayLatestActionAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayLatestActionAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getRegister: () => ({
        setActionInfo,
        getLatestAction: () => ({ id: "EatAction", counter: 3 }),
      }),
    });
    await action.do({
      message: "what are you doing",
      messageElems: ["what are you doing"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "My latest action is EatAction",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say it has not done anything when there is no latest action", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayLatestActionAction({
      sayMessage,
      getRegister: () => ({
        setActionInfo,
        getLatestAction: () => null,
      }),
    });
    await action.do({
      message: "what are you doing",
      messageElems: ["what are you doing"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "I have not done anything yet",
    );
  });
});
