"use strict";
import bag from "bagofcli";
import referee from "@sinonjs/referee";
import sinon from "sinon";

import BaseEngine from "../../lib/engines/base.js";

const assert = referee.assert;

describe("BaseEngine", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should log errors for methods concrete engines must implement", () => {
    const errorStub = sinon.stub(bag, "logStepItemError");
    const engine = new BaseEngine({});

    engine.getId();
    engine.getEvaluationIntervalInSeconds();
    engine.evaluate();

    assert.equals(errorStub.callCount, 3);
  });

  it("should own scheduling, status, evaluation, and shutdown lifecycle", async () => {
    const clock = sinon.useFakeTimers();
    const npc = { stop: sinon.stub().resolves("success") };
    class ConcreteEngine extends BaseEngine {
      getId() {
        return "ConcreteEngine";
      }

      getEvaluationIntervalInSeconds() {
        return 2;
      }

      async evaluate() {
        return { goal: "test goal", outcome: "success" };
      }
    }
    const engine = new ConcreteEngine(npc);

    assert.equals(engine.start(), "success");
    assert.equals(engine.start(), "success");
    await clock.tickAsync(0);
    assert.equals(engine.getStatus(), {
      enabled: true,
      currentGoal: "test goal",
      lastOutcome: "success",
    });
    assert.isFalse(engine.timer.hasRef());
    assert.equals(await engine.stop(), "success");
    assert.equals(await engine.stop(), "success");
    assert.equals(npc.stop.callCount, 1);
  });

  it("should prevent overlap, provide idle defaults, and retain failures", async () => {
    const engine = new BaseEngine({ stop: sinon.stub().resolves("success") });
    sinon.stub(engine, "getEvaluationIntervalInSeconds").returns(1);
    const evaluateStub = sinon.stub(engine, "evaluate").returns(undefined);
    engine.enabled = true;
    engine.evaluating = true;

    await engine._evaluate();
    assert.equals(evaluateStub.callCount, 0);

    engine.evaluating = false;
    await engine._evaluate();
    assert.equals(engine.currentGoal, "idle");
    assert.equals(engine.lastOutcome, "idle");

    evaluateStub.throws(new Error("policy failed"));
    await engine._evaluate();
    assert.equals(engine.lastOutcome, "failed: policy failed");
    await engine.stop();
  });
});
