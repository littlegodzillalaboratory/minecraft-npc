"use strict";
import ComplimentPlayerAction from "../../lib/actions/compliment-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ComplimentPlayerAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ComplimentPlayerAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ComplimentPlayerAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "compliment me",
      messageElems: ["compliment me"],
      player: "alice",
    });
    assert.match(sayMessage.firstCall.args[0], /^alice, /);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
