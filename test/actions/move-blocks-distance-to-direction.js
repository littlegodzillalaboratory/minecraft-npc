"use strict";
import MoveBlocksDistanceToDirectionAction from "../../lib/actions/move-blocks-distance-to-direction.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MoveBlocksDistanceToDirectionAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MoveBlocksDistanceToDirectionAction on valid message", async () => {
    const move = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new MoveBlocksDistanceToDirectionAction({
      moveBlocksDistanceToDirection: move,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "move 7 blocks rightward",
      messageElems: ["move 7 blocks rightward", "7", "rightward"],
    });
    assert.equals(move.firstCall.args[0], 7);
    assert.equals(move.firstCall.args[1], "rightward");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
