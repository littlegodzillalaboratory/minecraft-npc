"use strict";
import EquipArmorAction from "../../lib/actions/equip-armor.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("EquipArmorAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run EquipArmorAction", async () => {
    const equipArmor = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new EquipArmorAction({
      equipArmor,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "armor up",
      messageElems: ["armor up"],
      player: "alice",
    });
    assert.equals(equipArmor.callCount, 1);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
