"use strict";
import BreedAnimalsAction from "../../lib/actions/breed-animals.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("BreedAnimalsAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run BreedAnimalsAction", async () => {
    const breedAnimals = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new BreedAnimalsAction({
      breedAnimals,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "breed the cows",
      messageElems: ["breed the cows", "cows"],
      player: "alice",
    });
    assert.equals(breedAnimals.firstCall.args[0], "cow");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
