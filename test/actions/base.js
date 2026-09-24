"use strict";
import BaseAction from "../../lib/actions/base.js";
import bag from "bagofcli";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("BaseAction", () => {
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

  it("should relay a structured outcome message and register its status", () => {
    const sayMessage = sinon.spy();
    const setActionInfo = sinon.spy();
    class ConcreteAction extends BaseAction {
      getId() {
        return "ConcreteAction";
      }
    }
    const action = new ConcreteAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });

    action.registerInfo({ status: "failed", message: "Not available" });

    assert.equals(sayMessage.firstCall.args, ["Not available"]);
    assert.equals(setActionInfo.firstCall.args, ["ConcreteAction", "failed"]);
  });

  it("should move to successful query outcomes and preserve failures", async () => {
    const moveToLocation = sinon.stub().resolves("success");
    const action = new BaseAction({ moveToLocation });
    assert.equals(
      await action.moveToOutcome({
        status: "success",
        value: { posX: 1, posY: 2, posZ: 3 },
      }),
      "success",
    );
    const failure = { status: "failed", message: "No destination" };
    assert.same(await action.moveToOutcome(failure), failure);
    assert.equals(moveToLocation.firstCall.args, [1, 2, 3]);
  });
});
