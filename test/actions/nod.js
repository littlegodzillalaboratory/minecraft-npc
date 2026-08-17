"use strict";
import NodAction from "../../lib/actions/nod.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("NodAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run NodAction", async () => {
    const gesture = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new NodAction({
      gesture,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({ message: "nod", messageElems: ["nod"], player: "alice" });
    assert.equals(gesture.firstCall.args[0], "nod");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
