"use strict";
import EquipWeaponAction from "../../lib/actions/equip-weapon.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EquipWeaponAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run EquipWeaponAction", async () => {
    const equipItem = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new EquipWeaponAction({
      equipItem,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "draw your sword",
      messageElems: ["draw your sword"],
      player: "alice",
    });
    assert.equals(equipItem.firstCall.args[0], "sword");
    assert.equals(equipItem.firstCall.args[1], "hand");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
