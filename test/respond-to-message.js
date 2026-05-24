"use strict";
import ForwardToChatGptAction from "../lib/actions/forward-to-chatgpt.js";
import RespondToMessageAction from "../lib/actions/respond-to-message.js";
import StopCurrentAction from "../lib/actions/stop-current-action.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";
const assert = referee.assert;

describe("RespondToMessageAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should invoke stop action when receiving stop message", () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const stopStub = sinon.stub(StopCurrentAction.prototype, "do");
    const forwardStub = sinon.stub(ForwardToChatGptAction.prototype, "do");

    action.do({
      message: "stop",
      sender: "alice",
    });

    assert.equals(stopStub.callCount, 1);
    assert.equals(forwardStub.callCount, 0);
  });
});
