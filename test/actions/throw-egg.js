"use strict";
import ThrowEggAction from "../../lib/actions/throw-egg.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ThrowEggAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ThrowEggAction", async () => {
    const activateItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ThrowEggAction({
      activateItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "throw an egg",
      messageElems: ["throw an egg"],
      player: "alice",
    });
    assert.equals(activateItem.firstCall.args[0], "egg");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
