"use strict";
import EatSpecificFoodAction from "../../lib/actions/eat-specific-food.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EatSpecificFoodAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run EatSpecificFoodAction", async () => {
    const eatFood = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new EatSpecificFoodAction({
      eatFood,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "eat an apple",
      messageElems: ["eat an apple", "apple"],
      player: "alice",
    });
    assert.equals(eatFood.firstCall.args[0], "apple");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
