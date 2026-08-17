"use strict";
import EmptyInventoryAction from "../../lib/actions/empty-inventory.js";
import bag from "bagofcli";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EmptyInventoryAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run EmptyInventoryAction", async () => {
    const logStub = sinon.stub(bag, "logStepHeading");
    const emptyInventory = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new EmptyInventoryAction({
      emptyInventory,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({});
    assert.equals(logStub.callCount, 1);
    assert.equals(emptyInventory.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
