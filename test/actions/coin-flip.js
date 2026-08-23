"use strict";
import CoinFlipAction from "../../lib/actions/coin-flip.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CoinFlipAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should land on heads when random is below 0.5", async () => {
    sinon.stub(Math, "random").returns(0.1);
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
    assert.equals(sayMessage.firstCall.args[0], "The coin landed on heads");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should land on tails when random is 0.5 or above", async () => {
    sinon.stub(Math, "random").returns(0.5);
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
    assert.equals(sayMessage.firstCall.args[0], "The coin landed on tails");
  });
});
