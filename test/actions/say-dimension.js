"use strict";
import SayDimensionAction from "../../lib/actions/say-dimension.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayDimensionAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayDimensionAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayDimensionAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ game: { dimension: "overworld" } }),
    });
    await action.do({
      message: "what dimension are you in",
      messageElems: ["what dimension"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "I am in the overworld dimension",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
