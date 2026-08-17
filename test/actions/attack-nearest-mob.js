"use strict";
import AttackNearestMobAction from "../../lib/actions/attack-nearest-mob.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("AttackNearestMobAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run AttackNearestMobAction", async () => {
    const attackNearestEntity = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new AttackNearestMobAction({
      attackNearestEntity,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "attack the nearest zombie",
      messageElems: ["attack the nearest zombie", "zombie"],
      player: "alice",
    });
    assert.equals(attackNearestEntity.firstCall.args[0], "zombie");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
