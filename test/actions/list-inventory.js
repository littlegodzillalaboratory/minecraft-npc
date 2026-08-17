"use strict";
import ListInventoryAction from "../../lib/actions/list-inventory.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ListInventoryAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ListInventoryAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ListInventoryAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        inventory: { items: () => [{ name: "stone", count: 2 }] },
      }),
    });
    await action.do({
      message: "list inventory",
      messageElems: ["list inventory"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I have: stone x 2");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
