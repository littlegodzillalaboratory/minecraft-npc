"use strict";
import SayExperienceAction from "../../lib/actions/say-experience.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayExperienceAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayExperienceAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayExperienceAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ experience: { level: 5 } }),
    });
    await action.do({
      message: "what level are you",
      messageElems: ["what level are you"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I am level 5");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
