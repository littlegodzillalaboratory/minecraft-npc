"use strict";
import FarewellAction from "../../lib/actions/farewell.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FarewellAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FarewellAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FarewellAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({ message: "bye", messageElems: ["bye"], player: "alice" });
    assert.equals(
      sayMessage.firstCall.args[0],
      "Goodbye alice! See you around.",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
