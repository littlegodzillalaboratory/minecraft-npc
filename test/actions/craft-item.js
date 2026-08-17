"use strict";
import CraftItemAction from "../../lib/actions/craft-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CraftItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run CraftItemAction", async () => {
    const craftItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new CraftItemAction({
      craftItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "craft some sticks",
      messageElems: ["craft some sticks", "sticks"],
      player: "alice",
    });
    assert.equals(craftItem.firstCall.args[0], "sticks");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
