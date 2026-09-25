"use strict";
import referee from "@sinonjs/referee";
import sinon from "sinon";

import AutoMode from "../lib/auto-mode.js";

const assert = referee.assert;

describe("AutoMode", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should enable the default homesteader engine and report its policy", async () => {
    const mode = new AutoMode({ stop: sinon.stub().resolves("success") }, {});
    const homesteader = mode.engines.get("homesteader");
    sinon.stub(homesteader, "start").returns("success");
    sinon.stub(homesteader, "getStatus").returns({
      enabled: true,
      currentGoal: "find food",
      lastOutcome: "success",
    });

    assert.equals(await mode.enable(), "success");
    assert.equals(await mode.enable(), "success");
    assert.equals(homesteader.start.callCount, 2);
    assert.equals(mode.getStatus(), {
      engine: "homesteader",
      enabled: true,
      currentGoal: "find food",
      lastOutcome: "success",
    });
  });

  it("should reject an unknown policy engine", async () => {
    const mode = new AutoMode({}, {});

    assert.equals(await mode.enable("destroyer"), {
      status: "failed",
      message: "Unknown auto-mode engine: destroyer",
    });
  });

  it("should disable safely before and after an engine is selected", async () => {
    const mode = new AutoMode({}, {});
    const homesteader = mode.engines.get("homesteader");
    sinon.stub(homesteader, "start").returns("success");
    sinon.stub(homesteader, "stop").resolves("success");

    assert.equals(await mode.disable(), "success");
    await mode.enable("homesteader");
    assert.equals(await mode.disable(), "success");
    assert.equals(homesteader.stop.callCount, 1);
  });

  it("should stop the active engine before selecting another policy", async () => {
    const mode = new AutoMode({}, {});
    const homesteader = mode.engines.get("homesteader");
    const alternate = { start: sinon.stub().returns("success") };
    sinon.stub(homesteader, "start").returns("success");
    sinon.stub(homesteader, "stop").resolves("success");
    mode.engines.set("alternate", alternate);

    await mode.enable("homesteader");
    assert.equals(await mode.enable("alternate"), "success");
    assert.equals(homesteader.stop.callCount, 1);
    assert.equals(alternate.start.callCount, 1);
  });

  it("should report an idle disabled mode when its default is unknown", () => {
    const mode = new AutoMode({}, { autoModeEngine: "unknown" });

    assert.equals(mode.getStatus(), {
      engine: undefined,
      enabled: false,
      currentGoal: "idle",
      lastOutcome: undefined,
    });
  });
});
