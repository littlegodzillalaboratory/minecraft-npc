"use strict";
import GuardCurrentLocationAction from "../../lib/actions/guard-current-location.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("GuardCurrentLocationAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run GuardCurrentLocationAction", () => {
    const guardLocation = sinon.stub().returns("success");
    const action = new GuardCurrentLocationAction({
      getPosition: () => ({ x: 1, y: 2, z: 3 }),
      guardLocation,
      getRegister: () => ({ setActionInfo: () => {} }),
    });
    action.do({});
    assert.equals(guardLocation.firstCall.args[0], 1);
    assert.equals(guardLocation.firstCall.args[1], 2);
    assert.equals(guardLocation.firstCall.args[2], 3);
  });
});
