"use strict";
import PlaceBlockAction from "../../lib/actions/place-block.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("PlaceBlockAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run PlaceBlockAction", async () => {
    const placeBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new PlaceBlockAction({
      placeBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "place a cobblestone",
      messageElems: ["place a cobblestone", "cobblestone"],
      player: "alice",
    });
    assert.equals(placeBlock.firstCall.args[0], "cobblestone");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
