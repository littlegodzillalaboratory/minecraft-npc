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
      getOpts: () => ({
        autoModeAllowedHuntAnimals: ["chicken"],
        autoModeMaximumHuntingDistance: 32,
      }),
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "hunt for food",
      messageElems: ["hunt for food"],
      player: "alice",
    });
    assert.equals(huntFood.callCount, 1);
    assert.equals(huntFood.firstCall.args, [["chicken"], 32]);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should accept policy supplied by auto mode", async () => {
    const huntFood = sinon.stub().resolves("success");
    const action = new HuntFoodAction({
      huntFood: huntFood,
      getOpts: () => ({}),
      getRegister: () => ({ setActionInfo: sinon.spy() }),
    });

    await action.do({ allowedAnimals: ["rabbit"], maximumDistance: 20 });

    assert.equals(huntFood.firstCall.args, [["rabbit"], 20]);
  });

  it("should preserve hunting defaults when no policy is configured", async () => {
    const huntFood = sinon.stub().resolves("success");
    const action = new HuntFoodAction({
      huntFood: huntFood,
      getOpts: () => ({}),
      getRegister: () => ({ setActionInfo: sinon.spy() }),
    });

    await action.do({});

    assert.equals(huntFood.firstCall.args[1], 64);
    assert.isTrue(huntFood.firstCall.args[0].includes("chicken"));
  });
});
