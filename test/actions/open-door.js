"use strict";
import OpenDoorAction from "../../lib/actions/open-door.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("OpenDoorAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run OpenDoorAction", async () => {
    const activateBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new OpenDoorAction({
      activateBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "open the door",
      messageElems: ["open the door"],
      player: "alice",
    });
    assert.equals(activateBlock.firstCall.args[0], "door");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
