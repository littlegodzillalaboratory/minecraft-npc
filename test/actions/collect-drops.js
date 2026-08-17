"use strict";
import CollectDropsAction from "../../lib/actions/collect-drops.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CollectDropsAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run CollectDropsAction", async () => {
    const collectItems = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new CollectDropsAction({
      collectItems,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "pick up the drops",
      messageElems: ["pick up the drops"],
      player: "alice",
    });
    assert.equals(collectItems.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
