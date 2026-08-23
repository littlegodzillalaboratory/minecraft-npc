"use strict";
import LookAtPlayerAction from "../../lib/actions/look-at-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("LookAtPlayerAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run LookAtPlayerAction", async () => {
    const lookAtLocation = sinon.stub().resolves("success");
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new LookAtPlayerAction({
      lookAtLocation,
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        players: { alice: { entity: { position: { x: 1, y: 2, z: 3 } } } },
      }),
    });
    await action.do({
      message: "look at me",
      messageElems: ["look at me"],
      player: "alice",
    });
    assert.equals(lookAtLocation.firstCall.args[0], 1);
    assert.equals(lookAtLocation.firstCall.args[1], 3.6);
    assert.equals(lookAtLocation.firstCall.args[2], 3);
    assert.equals(sayMessage.callCount, 0);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say it cannot see the player when not found", async () => {
    const lookAtLocation = sinon.stub().resolves("success");
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new LookAtPlayerAction({
      lookAtLocation,
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ players: {} }),
    });
    await action.do({
      message: "look at me",
      messageElems: ["look at me"],
      player: "alice",
    });
    assert.equals(lookAtLocation.callCount, 0);
    assert.equals(sayMessage.firstCall.args[0], "I cannot see you, alice");
  });
});
