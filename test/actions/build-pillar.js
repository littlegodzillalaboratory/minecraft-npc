"use strict";
import BuildPillarAction from "../../lib/actions/build-pillar.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("BuildPillarAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run BuildPillarAction", async () => {
    const buildPillar = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new BuildPillarAction({
      buildPillar,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "pillar up 5",
      messageElems: ["pillar up 5", "5"],
      player: "alice",
    });
    assert.equals(buildPillar.firstCall.args[0], 5);
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should default height to 3 when not specified", async () => {
    const buildPillar = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new BuildPillarAction({
      buildPillar,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "build a pillar",
      messageElems: ["build a pillar"],
      player: "alice",
    });
    assert.equals(buildPillar.firstCall.args[0], 3);
  });
});
