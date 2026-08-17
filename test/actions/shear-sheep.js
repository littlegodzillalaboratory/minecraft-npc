"use strict";
import ShearSheepAction from "../../lib/actions/shear-sheep.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ShearSheepAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ShearSheepAction", async () => {
    const useItemOnEntity = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ShearSheepAction({
      useItemOnEntity,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "shear the sheep",
      messageElems: ["shear the sheep"],
      player: "alice",
    });
    assert.equals(useItemOnEntity.firstCall.args[0], "shears");
    assert.equals(useItemOnEntity.firstCall.args[1], "sheep");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
