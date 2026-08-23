"use strict";
import RollDiceAction from "../../lib/actions/roll-dice.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("RollDiceAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run RollDiceAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new RollDiceAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "roll a d20",
      messageElems: ["roll a d20", "20"],
      player: "alice",
    });
    assert.match(sayMessage.firstCall.args[0], /I rolled a \d+ out of 20/);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should default sides to 6 when not specified", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new RollDiceAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "roll a dice",
      messageElems: ["roll a dice"],
      player: "alice",
    });
    assert.match(sayMessage.firstCall.args[0], /I rolled a \d+ out of 6/);
  });
});
