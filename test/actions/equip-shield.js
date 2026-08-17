"use strict";
import EquipShieldAction from "../../lib/actions/equip-shield.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EquipShieldAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run EquipShieldAction", async () => {
    const equipItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new EquipShieldAction({
      equipItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "raise your shield",
      messageElems: ["raise your shield"],
      player: "alice",
    });
    assert.equals(equipItem.firstCall.args[0], "shield");
    assert.equals(equipItem.firstCall.args[1], "off-hand");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
