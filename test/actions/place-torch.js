"use strict";
import PlaceTorchAction from "../../lib/actions/place-torch.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("PlaceTorchAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run PlaceTorchAction", async () => {
    const placeBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new PlaceTorchAction({
      placeBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "place a torch",
      messageElems: ["place a torch"],
      player: "alice",
    });
    assert.equals(placeBlock.firstCall.args[0], "torch");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
