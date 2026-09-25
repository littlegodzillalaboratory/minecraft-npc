"use strict";
import referee from "@sinonjs/referee";
import sinon from "sinon";

import SayAutoModeStatusAction from "../../lib/actions/say-auto-mode-status.js";

const assert = referee.assert;

describe("SayAutoModeStatusAction", () => {
  it("should report enabled auto mode status", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayAutoModeStatusAction({
      getAutoModeStatus: () => ({
        engine: "homesteader",
        enabled: true,
        currentGoal: "find food",
      }),
      sayMessage: sayMessage,
      getRegister: () => ({ setActionInfo: setActionInfo }),
    });

    await action.do({});

    assert.equals(
      sayMessage.firstCall.args[0],
      "Auto mode is enabled as homesteader; current goal: find food",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should report disabled auto mode status", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const action = new SayAutoModeStatusAction({
      getAutoModeStatus: () => ({ enabled: false, currentGoal: "idle" }),
      sayMessage: sayMessage,
      getRegister: () => ({ setActionInfo: sinon.spy() }),
    });

    await action.do({});

    assert.equals(
      sayMessage.firstCall.args[0],
      "Auto mode is disabled; current goal: idle",
    );
  });
});
