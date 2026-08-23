"use strict";
import GoToPlayerAction from "../../lib/actions/go-to-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("GoToPlayerAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run GoToPlayerAction", async () => {
    const moveToLocation = sinon.stub().resolves("success");
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new GoToPlayerAction({
      moveToLocation,
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        players: { carol: { entity: { position: { x: 4, y: 5, z: 6 } } } },
      }),
    });
    await action.do({
      message: "go to player carol",
      messageElems: ["go to player carol", "carol"],
      player: "alice",
    });
    assert.equals(moveToLocation.firstCall.args[0], 4);
    assert.equals(sayMessage.callCount, 0);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say it cannot see the player when not found", async () => {
    const moveToLocation = sinon.stub().resolves("success");
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new GoToPlayerAction({
      moveToLocation,
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ players: {} }),
    });
    await action.do({
      message: "go to player carol",
      messageElems: ["go to player carol", "carol"],
      player: "alice",
    });
    assert.equals(moveToLocation.callCount, 0);
    assert.equals(sayMessage.firstCall.args[0], "I cannot see carol");
  });
});
