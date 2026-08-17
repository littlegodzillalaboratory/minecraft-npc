"use strict";
import ThankYouResponseAction from "../../lib/actions/thank-you-response.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ThankYouResponseAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ThankYouResponseAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ThankYouResponseAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({ message: "thanks", messageElems: ["thanks"], player: "alice" });
    assert.equals(sayMessage.firstCall.args[0], "You are welcome, alice!");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
