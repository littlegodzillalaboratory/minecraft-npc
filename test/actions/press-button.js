"use strict";
import PressButtonAction from "../../lib/actions/press-button.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("PressButtonAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run PressButtonAction", async () => {
    const activateBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new PressButtonAction({
      activateBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "press the button",
      messageElems: ["press the button"],
      player: "alice",
    });
    assert.equals(activateBlock.firstCall.args[0], "button");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
