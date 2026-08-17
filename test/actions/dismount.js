"use strict";
import DismountAction from "../../lib/actions/dismount.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DismountAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run DismountAction", async () => {
    const dismount = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new DismountAction({
      dismount,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "dismount",
      messageElems: ["dismount"],
      player: "alice",
    });
    assert.equals(dismount.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
