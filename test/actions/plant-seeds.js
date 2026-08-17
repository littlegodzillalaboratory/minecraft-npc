"use strict";
import PlantSeedsAction from "../../lib/actions/plant-seeds.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("PlantSeedsAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run PlantSeedsAction", async () => {
    const plantSeeds = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new PlantSeedsAction({
      plantSeeds,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "plant some seeds",
      messageElems: ["plant some seeds"],
      player: "alice",
    });
    assert.equals(plantSeeds.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
