"use strict";
import EquipItemAction from "../../lib/actions/equip-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EquipItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run EquipItemAction", async () => {
    const equipItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new EquipItemAction({
      equipItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "hold the torch",
      messageElems: ["hold the torch", "torch"],
      player: "alice",
    });
    assert.equals(equipItem.firstCall.args[0], "torch");
    assert.equals(equipItem.firstCall.args[1], "hand");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
