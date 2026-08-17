"use strict";
import HarvestCropsAction from "../../lib/actions/harvest-crops.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("HarvestCropsAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run HarvestCropsAction", async () => {
    const harvestCrops = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new HarvestCropsAction({
      harvestCrops,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "harvest the crops",
      messageElems: ["harvest the crops"],
      player: "alice",
    });
    assert.equals(harvestCrops.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
