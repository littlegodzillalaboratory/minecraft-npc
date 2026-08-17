"use strict";
import FollowPlayerAction from "../../lib/actions/follow-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FollowPlayerAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FollowPlayerAction", async () => {
    const followPlayer = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FollowPlayerAction({
      followPlayer,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "follow me",
      messageElems: ["follow me"],
      player: "alice",
    });
    assert.equals(followPlayer.callCount, 1);
    assert.equals(followPlayer.firstCall.args[0], "alice");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
