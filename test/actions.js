"use strict";
import BaseAction from "../lib/actions/base.js";
import EmptyInventoryAction from "../lib/actions/empty-inventory.js";
import ForwardToChatGptAction from "../lib/actions/forward-to-chatgpt.js";
import GuardCurrentLocationAction from "../lib/actions/guard-current-location.js";
import MoveBlocksDistanceToDirectionAction from "../lib/actions/move-blocks-distance-to-direction.js";
import MoveToInitLocationAction from "../lib/actions/move-to-init-location.js";
import MoveToObjectAction from "../lib/actions/move-to-object.js";
import MoveToPlayerLocationAction from "../lib/actions/move-to-player-location.js";
import SayCurrentLocationAction from "../lib/actions/say-current-location.js";
import SayInitMessageAction from "../lib/actions/say-init-message.js";
import StopCurrentAction from "../lib/actions/stop-current-action.js";
import bag from "bagofcli";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("actions", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should log default BaseAction errors", () => {
    const errorStub = sinon.stub(bag, "logStepItemError");
    const action = new BaseAction({
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.getId();
    action.do({});
    assert.equals(errorStub.callCount, 2);
  });

  it("should register BaseAction status", () => {
    const setActionInfo = sinon.spy();
    class ConcreteAction extends BaseAction {
      getId() {
        return "ConcreteAction";
      }
    }
    const action = new ConcreteAction({
      getRegister: () => ({ setActionInfo }),
    });
    action.registerInfo("success");
    assert.equals(setActionInfo.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[0], "ConcreteAction");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should run EmptyInventoryAction", () => {
    const logStub = sinon.stub(bag, "logStepHeading");
    const emptyInventory = sinon.stub().returns("success");
    const setActionInfo = sinon.spy();
    const action = new EmptyInventoryAction({
      emptyInventory,
      getRegister: () => ({ setActionInfo }),
    });
    action.do({});
    assert.equals(logStub.callCount, 1);
    assert.equals(emptyInventory.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
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

  it("should run GuardCurrentLocationAction", () => {
    const guardLocation = sinon.stub().returns("success");
    const action = new GuardCurrentLocationAction({
      getPosition: () => ({ x: 1, y: 2, z: 3 }),
      guardLocation,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({});
    assert.equals(guardLocation.firstCall.args[0], 1);
    assert.equals(guardLocation.firstCall.args[1], 2);
    assert.equals(guardLocation.firstCall.args[2], 3);
  });

  it("should run MoveToInitLocationAction", () => {
    const moveToLocation = sinon.stub().returns("success");
    const action = new MoveToInitLocationAction({
      moveToLocation,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({ posX: 5, posY: 6, posZ: 7 });
    assert.equals(moveToLocation.firstCall.args[0], 5);
    assert.equals(moveToLocation.firstCall.args[1], 6);
    assert.equals(moveToLocation.firstCall.args[2], 7);
  });

  it("should run MoveToPlayerLocationAction", () => {
    const moveToLocation = sinon.stub().returns("success");
    const action = new MoveToPlayerLocationAction({
      getPlayerPosition: () => ({ x: 11, y: 12, z: 13 }),
      moveToLocation,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({ player: "alice" });
    assert.equals(moveToLocation.firstCall.args[0], 11);
    assert.equals(moveToLocation.firstCall.args[1], 12);
    assert.equals(moveToLocation.firstCall.args[2], 13);
  });

  it("should run SayCurrentLocationAction", () => {
    const sayMessage = sinon.stub().returns("success");
    const action = new SayCurrentLocationAction({
      getPosition: () => ({ x: 2, y: 3, z: 4 }),
      sayMessage,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({});
    assert.equals(sayMessage.firstCall.args[0], "I am at 2 3 4");
  });

  it("should run SayInitMessageAction", () => {
    const sayMessage = sinon.stub().returns("success");
    const action = new SayInitMessageAction({
      sayMessage,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({ messages: ["a", "b"] });
    assert.equals(sayMessage.callCount, 1);
  });

  it("should run StopCurrentAction", () => {
    const stop = sinon.stub().returns("success");
    const action = new StopCurrentAction({
      stop,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({});
    assert.equals(stop.callCount, 1);
  });

  it("should run MoveBlocksDistanceToDirectionAction on valid message", () => {
    const move = sinon.stub().returns("success");
    const setActionInfo = sinon.spy();
    const action = new MoveBlocksDistanceToDirectionAction({
      moveBlocksDistanceToDirection: move,
      getRegister: () => ({ setActionInfo }),
    });
    action.do({
      message: "move 7 blocks rightward",
      messageElems: ["move 7 blocks rightward", "7", "rightward"],
    });
    assert.equals(move.firstCall.args[0], 7);
    assert.equals(move.firstCall.args[1], "rightward");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should run MoveToObjectAction on valid message", () => {
    const moveToObject = sinon.stub().returns("success");
    const setActionInfo = sinon.spy();
    const action = new MoveToObjectAction({
      moveToObject,
      getRegister: () => ({ setActionInfo }),
    });
    action.do({
      message: "walk to a bed",
      messageElems: ["walk to a bed", "bed"],
    });
    assert.equals(moveToObject.firstCall.args[0], "bed");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
