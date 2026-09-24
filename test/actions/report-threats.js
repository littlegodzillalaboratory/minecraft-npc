"use strict";
import ReportThreatsAction from "../../lib/actions/report-threats.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ReportThreatsAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ReportThreatsAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ReportThreatsAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      findNearbyThreats: sinon.stub().returns(["zombie"]),
    });
    await action.do({
      message: "report threats",
      messageElems: ["report threats"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "Threats nearby: zombie");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say there are no threats when nothing hostile is nearby", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ReportThreatsAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      findNearbyThreats: sinon.stub().returns([]),
    });
    await action.do({
      message: "report threats",
      messageElems: ["report threats"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "There are no threats nearby");
  });
});
