"use strict";
import GiveItemToPlayerAction from "../../lib/actions/give-item-to-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("GiveItemToPlayerAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run GiveItemToPlayerAction", async () => {
    const giveItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new GiveItemToPlayerAction({
      giveItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "give me an apple",
      messageElems: ["give me an apple", "apple"],
      player: "alice",
    });
    assert.equals(giveItem.firstCall.args[0], "alice");
    assert.equals(giveItem.firstCall.args[1], "apple");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
