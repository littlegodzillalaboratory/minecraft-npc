"use strict";
import DropItemAction from "../../lib/actions/drop-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DropItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run DropItemAction", async () => {
    const dropItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new DropItemAction({
      dropItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "drop your sword",
      messageElems: ["drop your sword", "sword"],
      player: "alice",
    });
    assert.equals(dropItem.firstCall.args[0], "sword");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
