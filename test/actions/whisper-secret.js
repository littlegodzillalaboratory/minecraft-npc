"use strict";
import WhisperSecretAction from "../../lib/actions/whisper-secret.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("WhisperSecretAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run WhisperSecretAction", async () => {
    const whisper = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new WhisperSecretAction({
      whisper,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "tell me a secret",
      messageElems: ["tell me a secret"],
      player: "alice",
    });
    assert.equals(whisper.callCount, 1);
    assert.equals(whisper.firstCall.args[0], "alice");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
