"use strict";
import SayChestContentsAction from "../../lib/actions/say-chest-contents.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayChestContentsAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayChestContentsAction", async () => {
    const listChest = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayChestContentsAction({
      listChest,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "check the chest",
      messageElems: ["check the chest"],
      player: "alice",
    });
    assert.equals(listChest.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
