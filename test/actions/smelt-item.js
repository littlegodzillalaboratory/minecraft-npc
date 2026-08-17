"use strict";
import SmeltItemAction from "../../lib/actions/smelt-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SmeltItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SmeltItemAction", async () => {
    const smeltItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SmeltItemAction({
      smeltItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "smelt the iron ore",
      messageElems: ["smelt the iron ore", "iron ore"],
      player: "alice",
    });
    assert.equals(smeltItem.firstCall.args[0], "iron ore");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
