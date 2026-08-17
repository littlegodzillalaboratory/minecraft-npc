"use strict";
import CoinFlipAction from "../../lib/actions/coin-flip.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CoinFlipAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run CoinFlipAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new CoinFlipAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "flip a coin",
      messageElems: ["flip a coin"],
      player: "alice",
    });
    assert.match(
      sayMessage.firstCall.args[0],
      /The coin landed on (?:heads|tails)/,
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
