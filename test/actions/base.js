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
});
