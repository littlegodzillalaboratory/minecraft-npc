"use strict";
import SayDistanceToPlayerAction from "../../lib/actions/say-distance-to-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayDistanceToPlayerAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayDistanceToPlayerAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayDistanceToPlayerAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        players: {
          alice: { entity: { position: { distanceTo: () => 12.3 } } },
        },
        entity: { position: {} },
      }),
    });
    await action.do({
      message: "how far am i",
      messageElems: ["how far am i"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "You are 12 blocks away from me",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say it cannot see the player when not found", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayDistanceToPlayerAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        players: {},
        entity: { position: {} },
      }),
    });
    await action.do({
      message: "how far am i",
      messageElems: ["how far am i"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I cannot see you, alice");
  });
});
