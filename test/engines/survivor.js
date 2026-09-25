"use strict";
import referee from "@sinonjs/referee";
import sinon from "sinon";
import bag from "bagofcli";

import AttackNearestMobAction from "../../lib/actions/attack-nearest-mob.js";
import Survivor from "../../lib/engines/survivor.js";
import EatAction from "../../lib/actions/eat.js";
import FleeAction from "../../lib/actions/flee.js";
import HuntFoodAction from "../../lib/actions/hunt-food.js";

const assert = referee.assert;

describe("Survivor", () => {
  afterEach(() => {
    sinon.restore();
  });

  const createNpc = (state = {}) => ({
    getSurvivalState: sinon.stub().returns({
      health: 20,
      hunger: 20,
      foodCount: 20,
      nearbyThreats: [],
      ...state,
    }),
    findNearestAllowedAnimal: sinon.stub().returns(null),
    stop: sinon.stub().resolves("success"),
  });

  it("should start once, expose status, schedule evaluation, and stop", async () => {
    const clock = sinon.useFakeTimers();
    const npc = createNpc();
    const engine = new Survivor(npc, {});

    assert.equals(engine.getId(), "Survivor");
    assert.equals(engine.getEvaluationIntervalInSeconds(), 2);

    assert.equals(engine.start(), "success");
    assert.equals(engine.start(), "success");
    assert.equals(engine.getStatus(), {
      enabled: true,
      currentGoal: "idle",
      lastOutcome: undefined,
    });
    await clock.tickAsync(0);
    assert.equals(engine.getStatus().lastOutcome, "idle");
    assert.isTrue(engine.timer.hasRef() === false);

    assert.equals(await engine.stop(), "success");
    assert.equals(npc.stop.callCount, 1);
    assert.equals(engine.getStatus().enabled, false);
    assert.equals(engine.getStatus().currentGoal, "idle");
    engine._schedule(0);
    await engine._evaluate();
  });

  it("should flee from threats when health is low", async () => {
    const npc = createNpc({ health: 8, nearbyThreats: ["zombie"] });
    const action = sinon.stub(FleeAction.prototype, "do").resolves("success");
    const engine = new Survivor(npc, { autoModeFleeHealthThreshold: 8 });
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.callCount, 1);
    assert.equals(engine.currentGoal, "flee from threat");
    await engine.stop();
  });

  it("should defend against threats when healthy", async () => {
    const npc = createNpc({ health: 20, nearbyThreats: ["breeze"] });
    const action = sinon
      .stub(AttackNearestMobAction.prototype, "do")
      .resolves("success");
    const engine = new Survivor(npc, {});
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.firstCall.args[0].messageElems[1], "breeze");
    assert.equals(engine.currentGoal, "defend against breeze");
    await engine.stop();
  });

  it("should eat available food when hungry", async () => {
    const npc = createNpc({ hunger: 14, foodCount: 1 });
    const action = sinon.stub(EatAction.prototype, "do").resolves(undefined);
    const engine = new Survivor(npc, { autoModeHungerThreshold: 14 });
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.callCount, 1);
    assert.equals(engine.currentGoal, "eat available food");
    assert.equals(engine.lastOutcome, "success");
    await engine.stop();
  });

  it("should hunt only a policy-approved nearby animal", async () => {
    const npc = createNpc({ foodCount: 0 });
    npc.findNearestAllowedAnimal.returns({ name: "chicken" });
    const action = sinon
      .stub(HuntFoodAction.prototype, "do")
      .resolves("success");
    const engine = new Survivor(npc, {
      autoModeAllowedHuntAnimals: ["chicken"],
      autoModeMaximumHuntingDistance: 32,
      autoModeMinimumFoodReserve: 4,
    });
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.firstCall.args[0].allowedAnimals, ["chicken"]);
    assert.equals(action.firstCall.args[0].maximumDistance, 32);
    assert.equals(engine.currentGoal, "hunt chicken");
    await engine.stop();
  });

  it("should remain idle when no approved food animal is available", () => {
    const npc = createNpc({ foodCount: 0 });
    const engine = new Survivor(npc, {});

    const decision = engine._selectDecision(npc.getSurvivalState());

    assert.equals(decision, { goal: "idle", action: undefined, opts: {} });
  });

  it("should not overlap evaluations and should retain evaluation failures", async () => {
    const npc = createNpc();
    const engine = new Survivor(npc, {});
    engine.enabled = true;
    engine.evaluating = true;
    await engine._evaluate();
    assert.equals(npc.getSurvivalState.callCount, 0);

    engine.evaluating = false;
    npc.getSurvivalState.throws(new Error("observation failed"));
    await engine._evaluate();
    assert.equals(engine.lastOutcome, "failed: observation failed");
    await engine.stop();
  });

  it("should log evaluation headings and matched survival conditions", async () => {
    const heading = sinon.stub(bag, "logStepHeading");
    const success = sinon.stub(bag, "logStepItemSuccess");
    const npc = createNpc();
    const engine = new Survivor(npc, {});
    npc.findNearestAllowedAnimal.returns({ name: "chicken" });

    await engine.evaluate();
    engine._selectDecision({
      health: 8,
      hunger: 20,
      foodCount: 20,
      nearbyThreats: ["zombie"],
    });
    engine._selectDecision({
      health: 20,
      hunger: 20,
      foodCount: 20,
      nearbyThreats: ["zombie"],
    });
    engine._selectDecision({
      health: 20,
      hunger: 14,
      foodCount: 1,
      nearbyThreats: [],
    });
    engine._selectDecision({
      health: 20,
      hunger: 20,
      foodCount: 0,
      nearbyThreats: [],
    });

    assert.equals(heading.firstCall.args, ["Evaluating..."]);
    assert.equals(
      success.getCalls().map((call) => call.args[0]),
      [
        "No survival action needed",
        "Threat detected while health is low",
        "Threat detected",
        "Hunger detected and food is available",
        "Low food reserves detected",
        "Allowed hunting target detected: chicken",
      ],
    );
  });
});
