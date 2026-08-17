"use strict";
import PlaceCraftingTableAction from "../../lib/actions/place-crafting-table.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("PlaceCraftingTableAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run PlaceCraftingTableAction", async () => {
    const placeBlock = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new PlaceCraftingTableAction({
      placeBlock,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "set up a crafting table",
      messageElems: ["set up a crafting table"],
      player: "alice",
    });
    assert.equals(placeBlock.firstCall.args[0], "crafting_table");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
