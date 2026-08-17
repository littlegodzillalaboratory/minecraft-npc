"use strict";
import DefendMeAction from "../../lib/actions/defend-me.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("DefendMeAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run DefendMeAction", async () => {
    const defendPlayer = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new DefendMeAction({
      defendPlayer,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "defend me",
      messageElems: ["defend me"],
      player: "alice",
    });
    assert.equals(defendPlayer.firstCall.args[0], "alice");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
