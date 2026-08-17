"use strict";
import MoveToObjectAction from "../../lib/actions/move-to-object.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MoveToObjectAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MoveToObjectAction on valid message", async () => {
    const moveToObject = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new MoveToObjectAction({
      moveToObject,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "walk to a bed",
      messageElems: ["walk to a bed", "bed"],
    });
    assert.equals(moveToObject.firstCall.args[0], "bed");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
