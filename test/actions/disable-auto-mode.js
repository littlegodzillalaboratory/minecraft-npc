"use strict";
import referee from "@sinonjs/referee";
import sinon from "sinon";
import bag from "bagofcli";

import DisableAutoModeAction from "../../lib/actions/disable-auto-mode.js";

const assert = referee.assert;

describe("DisableAutoModeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should disable auto mode and register the outcome", async () => {
    const logStepHeading = sinon.stub(bag, "logStepHeading");
    const disableAutoMode = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new DisableAutoModeAction({
      disableAutoMode: disableAutoMode,
      getAutoModeStatus: () => ({ engine: "homesteader" }),
      getRegister: () => ({ setActionInfo: setActionInfo }),
    });

    await action.do({});

    assert.equals(disableAutoMode.callCount, 1);
    assert.equals(logStepHeading.firstCall.args, [
      "Disabling auto mode as homesteader...",
    ]);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
