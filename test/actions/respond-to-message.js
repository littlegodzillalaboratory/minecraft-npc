"use strict";
import ForwardToChatGptAction from "../../lib/actions/forward-to-chatgpt.js";
import MoveBlocksDistanceToDirectionAction from "../../lib/actions/move-blocks-distance-to-direction.js";
import MoveToObjectAction from "../../lib/actions/move-to-object.js";
import RespondToMessageAction from "../../lib/actions/respond-to-message.js";
import StopCurrentAction from "../../lib/actions/stop-current-action.js";
import TellJokeAction from "../../lib/actions/tell-joke.js";
import EatAction from "../../lib/actions/eat.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";
const assert = referee.assert;

describe("RespondToMessageAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should invoke stop action when receiving stop message", async () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const stopStub = sinon.stub(StopCurrentAction.prototype, "do").resolves();
    const forwardStub = sinon
      .stub(ForwardToChatGptAction.prototype, "do")
      .resolves();

    await action.do({
      message: "stop",
      sender: "alice",
    });

    assert.equals(stopStub.callCount, 1);
    assert.equals(forwardStub.callCount, 0);
  });

  it("should invoke move blocks distance to direction action when receiving a move blocks (plural) distance to direction command", async () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const moveBlocksDistanceToDirectionStub = sinon
      .stub(MoveBlocksDistanceToDirectionAction.prototype, "do")
      .resolves();
    const forwardStub = sinon
      .stub(ForwardToChatGptAction.prototype, "do")
      .resolves();

    await action.do({
      message: "move 5 blocks forward",
      sender: "alice",
    });

    assert.equals(moveBlocksDistanceToDirectionStub.callCount, 1);
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].message,
      "move 5 blocks forward",
    );
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].player,
      "alice",
    );
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].messageElems[1],
      "5",
    );
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].messageElems[2],
      "forward",
    );
    assert.equals(forwardStub.callCount, 0);
  });

  it("should invoke move blocks distance to direction action when receiving a move block (singular) distance to direction command", async () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const moveBlocksDistanceToDirectionStub = sinon
      .stub(MoveBlocksDistanceToDirectionAction.prototype, "do")
      .resolves();
    const forwardStub = sinon
      .stub(ForwardToChatGptAction.prototype, "do")
      .resolves();

    await action.do({
      message: "move 1 block forward",
      sender: "alice",
    });

    assert.equals(moveBlocksDistanceToDirectionStub.callCount, 1);
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].message,
      "move 1 block forward",
    );
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].player,
      "alice",
    );
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].messageElems[1],
      "1",
    );
    assert.equals(
      moveBlocksDistanceToDirectionStub.firstCall.args[0].messageElems[2],
      "forward",
    );
    assert.equals(forwardStub.callCount, 0);
  });

  it("should forward unknown message to ChatGPT", async () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const moveBlocksDistanceToDirectionStub = sinon
      .stub(MoveBlocksDistanceToDirectionAction.prototype, "do")
      .resolves();
    const forwardStub = sinon
      .stub(ForwardToChatGptAction.prototype, "do")
      .resolves();

    await action.do({
      message: "what is the meaning of life",
      sender: "alice",
    });

    assert.equals(moveBlocksDistanceToDirectionStub.callCount, 0);
    assert.equals(forwardStub.callCount, 1);
  });

  it("should invoke move to object action when receiving a move to object command", async () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const moveToObjectStub = sinon
      .stub(MoveToObjectAction.prototype, "do")
      .resolves();
    const forwardStub = sinon
      .stub(ForwardToChatGptAction.prototype, "do")
      .resolves();

    await action.do({
      message: "find a bed",
      sender: "alice",
    });

    assert.equals(moveToObjectStub.callCount, 1);
    assert.equals(moveToObjectStub.firstCall.args[0].message, "find a bed");
    assert.equals(moveToObjectStub.firstCall.args[0].messageElems[1], "bed");
    assert.equals(forwardStub.callCount, 0);
  });

  it("should invoke tell joke action when receiving a tell joke command", async () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const tellJokeStub = sinon.stub(TellJokeAction.prototype, "do").resolves();
    const forwardStub = sinon
      .stub(ForwardToChatGptAction.prototype, "do")
      .resolves();

    await action.do({
      message: "tell me a joke",
      sender: "alice",
    });

    assert.equals(tellJokeStub.callCount, 1);
    assert.equals(forwardStub.callCount, 0);
  });

  it("should invoke eat action when receiving an 'i am hungry' message", async () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const eatStub = sinon.stub(EatAction.prototype, "do").resolves();
    const forwardStub = sinon
      .stub(ForwardToChatGptAction.prototype, "do")
      .resolves();

    await action.do({
      message: "I am hungry",
      sender: "alice",
    });

    assert.equals(eatStub.callCount, 1);
    assert.equals(forwardStub.callCount, 0);
  });

  it("should not match partial phrases now that regexes are anchored", async () => {
    const register = {
      setActionInfo: sinon.spy(),
    };
    const npc = {
      getRegister: () => register,
    };
    const action = new RespondToMessageAction(npc);

    const eatStub = sinon.stub(EatAction.prototype, "do").resolves();
    const forwardStub = sinon
      .stub(ForwardToChatGptAction.prototype, "do")
      .resolves();

    // "Need a heating" contains "eat" as a substring but must not match
    // EatAction now that the regex is anchored with ^ and $
    await action.do({
      message: "Need a heating",
      sender: "alice",
    });

    assert.equals(eatStub.callCount, 0);
    assert.equals(forwardStub.callCount, 1);
  });
});
