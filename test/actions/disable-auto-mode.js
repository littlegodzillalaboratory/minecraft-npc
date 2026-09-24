"use strict";
import referee from "@sinonjs/referee";
import sinon from "sinon";

import DisableAutoModeAction from "../../lib/actions/disable-auto-mode.js";

const assert = referee.assert;

describe("DisableAutoModeAction", () => {
  it("should disable auto mode and register the outcome", async () => {
    const disableAutoMode = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new DisableAutoModeAction({
      disableAutoMode: disableAutoMode,
      getRegister: () => ({ setActionInfo: setActionInfo }),
    });

    await action.do({});

    assert.equals(disableAutoMode.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
