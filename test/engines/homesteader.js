"use strict";
import referee from "@sinonjs/referee";
import sinon from "sinon";
import bag from "bagofcli";

import AttackNearestMobAction from "../../lib/actions/attack-nearest-mob.js";
import Homesteader from "../../lib/engines/homesteader.js";
import EatAction from "../../lib/actions/eat.js";
import FleeAction from "../../lib/actions/flee.js";
import GoHomeAction from "../../lib/actions/go-home.js";
import HuntFoodAction from "../../lib/actions/hunt-food.js";
import SleepAction from "../../lib/actions/sleep.js";

const assert = referee.assert;

describe("Homesteader", () => {
  afterEach(() => {
    sinon.restore();
  });

  const createNpc = (state = {}) => ({
    getSurvivalState: sinon.stub().returns({
      health: 20,
      hunger: 20,
      foodCount: 20,
      nearbyThreats: [],
      timeOfDay: 6000,
      position: { x: 0, y: 64, z: 0 },
      ...state,
    }),
    getOpts: sinon.stub().returns({ initCoords: [0, 64, 0] }),
    findNearestAllowedAnimal: sinon.stub().returns(null),
    stop: sinon.stub().resolves("success"),
  });

  it("should start once, expose status, schedule evaluation, and stop", async () => {
    const clock = sinon.useFakeTimers();
    const npc = createNpc();
    const engine = new Homesteader(npc, {});

    assert.equals(engine.getId(), "Homesteader");
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
    const npc = createNpc({
      health: 8,
      nearbyThreats: [{ name: "zombie", distance: 5 }],
    });
    const action = sinon.stub(FleeAction.prototype, "do").resolves("success");
    const engine = new Homesteader(npc, { autoModeFleeHealthThreshold: 8 });
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.callCount, 1);
    assert.equals(engine.currentGoal, "flee from threat");
    await engine.stop();
  });

  it("should defend against threats when healthy", async () => {
    const npc = createNpc({
      health: 20,
      nearbyThreats: [{ name: "breeze", distance: 7 }],
    });
    const action = sinon
      .stub(AttackNearestMobAction.prototype, "do")
      .resolves("success");
    const engine = new Homesteader(npc, {});
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.firstCall.args[0].messageElems[1], "breeze");
    assert.equals(engine.currentGoal, "defend against breeze");
    await engine.stop();
  });

  it("should eat available food when hungry", async () => {
    const npc = createNpc({ hunger: 14, foodCount: 1 });
    const action = sinon.stub(EatAction.prototype, "do").resolves(undefined);
    const engine = new Homesteader(npc, { autoModeHungerThreshold: 14 });
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.callCount, 1);
    assert.equals(engine.currentGoal, "eat available food");
    assert.equals(engine.lastOutcome, "success");
    await engine.stop();
  });

  it("should return home at night when outside the home radius", async () => {
    const npc = createNpc({
      timeOfDay: 13000,
      position: { x: 10, y: 64, z: 0 },
    });
    const action = sinon.stub(GoHomeAction.prototype, "do").resolves("success");
    const engine = new Homesteader(npc, { autoModeHomeRadius: 3 });
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.callCount, 1);
    assert.equals(engine.currentGoal, "return home for the night");
    await engine.stop();
  });

  it("should sleep at night when inside the home radius", async () => {
    const npc = createNpc({
      timeOfDay: 23000,
      position: { x: 2, y: 64, z: 0 },
    });
    const action = sinon.stub(SleepAction.prototype, "do").resolves("success");
    const engine = new Homesteader(npc, { autoModeHomeRadius: 3 });
    engine.enabled = true;

    await engine._evaluate();

    assert.equals(action.callCount, 1);
    assert.equals(engine.currentGoal, "sleep at home");
    await engine.stop();
  });

  it("should wait before retrying sleep after a recent attempt", async () => {
    const clock = sinon.useFakeTimers({ now: 100000 });
    const npc = createNpc({
      timeOfDay: 18000,
      position: { x: 0, y: 64, z: 0 },
    });
    const action = sinon.stub(SleepAction.prototype, "do").resolves("failed");
    const engine = new Homesteader(npc, {
      autoModeSleepRetryCooldownInSeconds: 30,
    });

    await engine.evaluate();
    const result = await engine.evaluate();

    assert.equals(action.callCount, 1);
    assert.equals(result, { goal: "wait to retry sleep", outcome: "idle" });
    await clock.tickAsync(30000);
    await engine.evaluate();
    assert.equals(action.callCount, 2);
  });

  it("should not return home during daytime", () => {
    const npc = createNpc({
      timeOfDay: 12999,
      position: { x: 10, y: 64, z: 0 },
    });
    const engine = new Homesteader(npc, {});

    assert.equals(engine._selectDecision(npc.getSurvivalState()), {
      goal: "idle",
      action: undefined,
      opts: {},
    });
  });

  it("should use the origin as home when init coordinates are unavailable", () => {
    const npc = createNpc({
      timeOfDay: 23001,
      position: { x: 10, y: 0, z: 0 },
    });
    npc.getOpts.returns({});
    const engine = new Homesteader(npc, {});

    assert.isFalse(engine._isNight(23001));
    assert.isFalse(engine._isAtHome(undefined, [0, 0, 0]));
    assert.isFalse(engine._isAtHome({ x: 0, y: 0, z: 0 }, undefined));
    assert.equals(
      engine._selectDecision({
        ...npc.getSurvivalState(),
        timeOfDay: 13000,
      }).goal,
      "return home for the night",
    );
  });

  it("should hunt only a policy-approved nearby animal", async () => {
    const npc = createNpc({ foodCount: 0 });
    npc.findNearestAllowedAnimal.returns({ name: "chicken" });
    const action = sinon
      .stub(HuntFoodAction.prototype, "do")
      .resolves("success");
    const engine = new Homesteader(npc, {
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
    const engine = new Homesteader(npc, {});

    const decision = engine._selectDecision(npc.getSurvivalState());

    assert.equals(decision, { goal: "idle", action: undefined, opts: {} });
  });

  it("should not overlap evaluations and should retain evaluation failures", async () => {
    const npc = createNpc();
    const engine = new Homesteader(npc, {});
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
    const engine = new Homesteader(npc, {});
    npc.findNearestAllowedAnimal.returns({ name: "chicken" });

    await engine.evaluate();
    engine._selectDecision({
      health: 8,
      hunger: 20,
      foodCount: 20,
      nearbyThreats: [{ name: "zombie", distance: 5 }],
      timeOfDay: 6000,
      position: { x: 0, y: 64, z: 0 },
    });
    engine._selectDecision({
      health: 20,
      hunger: 20,
      foodCount: 20,
      nearbyThreats: [{ name: "zombie", distance: 5 }],
      timeOfDay: 6000,
      position: { x: 0, y: 64, z: 0 },
    });
    engine._selectDecision({
      health: 20,
      hunger: 14,
      foodCount: 1,
      nearbyThreats: [],
      timeOfDay: 6000,
      position: { x: 0, y: 64, z: 0 },
    });
    engine._selectDecision({
      health: 20,
      hunger: 20,
      foodCount: 0,
      nearbyThreats: [],
      timeOfDay: 6000,
      position: { x: 0, y: 64, z: 0 },
    });

    assert.equals(heading.firstCall.args, ["Evaluating..."]);
    assert.equals(
      success.getCalls().map((call) => call.args[0]),
      [
        "No survival action needed",
        "Threat detected while health is low: zombie (5 blocks away)",
        "Threat detected: zombie (5 blocks away)",
        "Hunger detected and food is available",
        "Low food reserves detected",
        "Allowed hunting target detected: chicken",
      ],
    );
  });
});
