"use strict";
import ForwardToChatGptAction from "../lib/actions/forward-to-chatgpt.js";
import MoveBlocksDistanceToDirectionAction from "../lib/actions/move-blocks-distance-to-direction.js";
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

  it("should invoke move blocks distance to direction action when receiving a move blocks distance to direction command", () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const moveBlocksDistanceToDirectionStub = sinon.stub(
      MoveBlocksDistanceToDirectionAction.prototype,
      "do",
    );
    const forwardStub = sinon.stub(ForwardToChatGptAction.prototype, "do");

    action.do({
      message: "move 5 blocks forward",
      sender: "alice",
    });

    assert.equals(moveBlocksDistanceToDirectionStub.callCount, 1);
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].message,
      "move 5 blocks forward",
    );
    assert.equals(moveBlocksDistanceToDirectionStub.firstCall.args[0].player, "alice");
    assert.equals(forwardStub.callCount, 0);
  });
});
