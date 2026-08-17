"use strict";
import FaceDirectionAction from "../../lib/actions/face-direction.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FaceDirectionAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FaceDirectionAction", async () => {
    const faceDirection = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FaceDirectionAction({
      faceDirection,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "face north",
      messageElems: ["face north", "north"],
      player: "alice",
    });
    assert.equals(faceDirection.firstCall.args[0], "north");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
