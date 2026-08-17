"use strict";
import MountEntityAction from "../../lib/actions/mount-entity.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MountEntityAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MountEntityAction", async () => {
    const mountEntity = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new MountEntityAction({
      mountEntity,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "ride the horse",
      messageElems: ["ride the horse", "horse"],
      player: "alice",
    });
    assert.equals(mountEntity.firstCall.args[0], "horse");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
