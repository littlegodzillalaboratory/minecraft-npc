"use strict";
import SayLightLevelAction from "../../lib/actions/say-light-level.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayLightLevelAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayLightLevelAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayLightLevelAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        blockAt: () => ({ light: 9 }),
        entity: { position: {} },
      }),
    });
    await action.do({
      message: "how dark is it",
      messageElems: ["how dark is it"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "The light level here is 9");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say unknown light level when block is unavailable", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayLightLevelAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        blockAt: () => null,
        entity: { position: {} },
      }),
    });
    await action.do({
      message: "how dark is it",
      messageElems: ["how dark is it"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "The light level here is unknown",
    );
  });
});
