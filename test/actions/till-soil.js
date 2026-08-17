"use strict";
import TillSoilAction from "../../lib/actions/till-soil.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("TillSoilAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run TillSoilAction", async () => {
    const tillSoil = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new TillSoilAction({
      tillSoil,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "till the soil",
      messageElems: ["till the soil"],
      player: "alice",
    });
    assert.equals(tillSoil.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
