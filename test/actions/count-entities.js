"use strict";
import CountEntitiesAction from "../../lib/actions/count-entities.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CountEntitiesAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run CountEntitiesAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new CountEntitiesAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        entities: {
          1: { name: "cow", position: { distanceTo: () => 5 } },
          2: { name: "cow", position: { distanceTo: () => 50 } },
        },
        entity: { position: {} },
      }),
    });
    await action.do({
      message: "how many cows are nearby",
      messageElems: ["how many cows are nearby", "cows"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I can see 1 cows nearby");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
