"use strict";
import referee from "@sinonjs/referee";
import sinon from "sinon";
import bag from "bagofcli";

import EnableAutoModeAction from "../../lib/actions/enable-auto-mode.js";

const assert = referee.assert;

describe("EnableAutoModeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should enable auto mode and register the outcome", async () => {
    const logStepHeading = sinon.stub(bag, "logStepHeading");
    const enableAutoMode = sinon.stub().returns("success");
    const setActionInfo = sinon.spy();
    const action = new EnableAutoModeAction({
      enableAutoMode: enableAutoMode,
      getRegister: () => ({ setActionInfo: setActionInfo }),
    });

    await action.do({ messageElems: [undefined, "survivor"] });

    assert.equals(enableAutoMode.callCount, 1);
    assert.equals(enableAutoMode.firstCall.args, ["survivor"]);
    assert.equals(logStepHeading.firstCall.args, [
      "Enabling auto mode as survivor...",
    ]);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should log the configured engine when the command omits it", async () => {
    const logStepHeading = sinon.stub(bag, "logStepHeading");
    const action = new EnableAutoModeAction({
      enableAutoMode: sinon.stub().returns("success"),
      getAutoModeStatus: () => ({ engine: "survivor" }),
      getRegister: () => ({ setActionInfo: sinon.spy() }),
    });

    await action.do({});

    assert.equals(logStepHeading.firstCall.args, [
      "Enabling auto mode as survivor...",
    ]);
  });
});
