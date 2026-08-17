"use strict";
import SayCurrentLocationAction from "../../lib/actions/say-current-location.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayCurrentLocationAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayCurrentLocationAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const action = new SayCurrentLocationAction({
      getPosition: () => ({ x: 2, y: 3, z: 4 }),
      sayMessage,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    await action.do({});
    assert.equals(sayMessage.firstCall.args[0], "I am at 2 3 4");
  });
});
