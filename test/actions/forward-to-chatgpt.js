"use strict";
import ForwardToChatGptAction from "../../lib/actions/forward-to-chatgpt.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ForwardToChatGptAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ForwardToChatGptAction", () => {
    const messageChatGpt = sinon.stub().returns("success");
    const setActionInfo = sinon.spy();
    const action = new ForwardToChatGptAction({
      messageChatGpt,
      getRegister: () => ({ setActionInfo }),
    });
    action.do({ player: "alice", message: "hello" });
    assert.equals(messageChatGpt.firstCall.args[0], "alice");
    assert.equals(messageChatGpt.firstCall.args[1], "hello");
  });
});
