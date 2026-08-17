"use strict";
import SayFoodLevelAction from "../../lib/actions/say-food-level.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayFoodLevelAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayFoodLevelAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayFoodLevelAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ food: 12 }),
    });
    await action.do({
      message: "are you hungry",
      messageElems: ["are you hungry"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "My food level is 12 out of 20",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
