"use strict";
import SayBiomeAction from "../../lib/actions/say-biome.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayBiomeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayBiomeAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayBiomeAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        blockAt: () => ({ biome: { name: "plains" } }),
        entity: { position: {} },
      }),
    });
    await action.do({
      message: "what biome is this",
      messageElems: ["what biome is this"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I am in the plains biome");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say unknown biome when block has no biome info", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayBiomeAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        blockAt: () => null,
        entity: { position: {} },
      }),
    });
    await action.do({
      message: "what biome is this",
      messageElems: ["what biome is this"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I am in the unknown biome");
  });
});
