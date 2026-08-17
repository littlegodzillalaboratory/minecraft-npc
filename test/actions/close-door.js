"use strict";
import CloseDoorAction from "../../lib/actions/close-door.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CloseDoorAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run CloseDoorAction", async () => {
    const activateBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new CloseDoorAction({
      activateBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "close the door",
      messageElems: ["close the door"],
      player: "alice",
    });
    assert.equals(activateBlock.firstCall.args[0], "door");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
