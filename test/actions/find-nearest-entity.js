"use strict";
import FindNearestEntityAction from "../../lib/actions/find-nearest-entity.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FindNearestEntityAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FindNearestEntityAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FindNearestEntityAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        nearestEntity: () => ({
          name: "sheep",
          position: { x: 1, y: 2, z: 3 },
        }),
      }),
    });
    await action.do({
      message: "where is the nearest sheep",
      messageElems: ["where is the nearest sheep", "sheep"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "The nearest sheep is at 1 2 3",
    );
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say it cannot see the entity when none is nearby", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FindNearestEntityAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        nearestEntity: () => null,
      }),
    });
    await action.do({
      message: "where is the nearest sheep",
      messageElems: ["where is the nearest sheep", "sheep"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "I cannot see any sheep nearby",
    );
  });
});
