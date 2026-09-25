"use strict";
import referee from "@sinonjs/referee";
import sinon from "sinon";

import EnableAutoModeAction from "../../lib/actions/enable-auto-mode.js";

const assert = referee.assert;

describe("EnableAutoModeAction", () => {
  it("should enable auto mode and register the outcome", async () => {
    const enableAutoMode = sinon.stub().returns("success");
    const setActionInfo = sinon.spy();
    const action = new EnableAutoModeAction({
      enableAutoMode: enableAutoMode,
      getRegister: () => ({ setActionInfo: setActionInfo }),
    });

    await action.do({ messageElems: [undefined, "survivor"] });

    assert.equals(enableAutoMode.callCount, 1);
    assert.equals(enableAutoMode.firstCall.args, ["survivor"]);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
