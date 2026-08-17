"use strict";
import EatAction from "../../lib/actions/eat.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EatAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run EatAction", async () => {
    const eat = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new EatAction({
      eat,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({});
    assert.equals(eat.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
