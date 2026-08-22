"use strict";
import SprintAction from "../../lib/actions/sprint.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SprintAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SprintAction", async () => {
    const sprint = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SprintAction({
      sprint,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "sprint",
      messageElems: ["sprint"],
      player: "alice",
    });
    assert.equals(sprint.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
