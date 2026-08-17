"use strict";
import SayNearestPlayerAction from "../../lib/actions/say-nearest-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayNearestPlayerAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayNearestPlayerAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayNearestPlayerAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        username: "bob",
        nearestEntity: () => ({ type: "player", username: "alice" }),
      }),
    });
    await action.do({
      message: "who is nearest to you",
      messageElems: ["who is nearest to you"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "The nearest player to me is alice",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
