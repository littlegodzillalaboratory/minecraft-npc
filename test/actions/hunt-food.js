"use strict";
import HuntFoodAction from "../../lib/actions/hunt-food.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("HuntFoodAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run HuntFoodAction", async () => {
    const huntFood = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new HuntFoodAction({
      huntFood,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "hunt for food",
      messageElems: ["hunt for food"],
      player: "alice",
    });
    assert.equals(huntFood.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
