"use strict";
import SingSongAction from "../../lib/actions/sing-song.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SingSongAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SingSongAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SingSongAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "sing a song",
      messageElems: ["sing a song"],
      player: "alice",
    });
    assert.equals(sayMessage.callCount, 3);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
