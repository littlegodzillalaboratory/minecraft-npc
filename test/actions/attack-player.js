"use strict";
import AttackPlayerAction from "../../lib/actions/attack-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("AttackPlayerAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run AttackPlayerAction", async () => {
    const attackPlayer = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new AttackPlayerAction({
      attackPlayer,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "attack player carol",
      messageElems: ["attack player carol", "carol"],
      player: "alice",
    });
    assert.equals(attackPlayer.firstCall.args[0], "carol");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
