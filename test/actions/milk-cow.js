"use strict";
import MilkCowAction from "../../lib/actions/milk-cow.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MilkCowAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MilkCowAction", async () => {
    const useItemOnEntity = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new MilkCowAction({
      useItemOnEntity,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "milk the cow",
      messageElems: ["milk the cow"],
      player: "alice",
    });
    assert.equals(useItemOnEntity.firstCall.args[0], "bucket");
    assert.equals(useItemOnEntity.firstCall.args[1], "cow");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
