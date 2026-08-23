"use strict";
import SayArmorAction from "../../lib/actions/say-armor.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayArmorAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayArmorAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayArmorAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        inventory: { slots: { 5: { name: "iron_helmet" } } },
      }),
    });
    await action.do({
      message: "what are you wearing",
      messageElems: ["what are you wearing"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I am wearing: iron_helmet");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say no armor when nothing is equipped", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayArmorAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        inventory: { slots: {} },
      }),
    });
    await action.do({
      message: "what are you wearing",
      messageElems: ["what are you wearing"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "I am not wearing any armor",
    );
  });
});
