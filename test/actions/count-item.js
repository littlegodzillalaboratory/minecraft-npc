"use strict";
import CountItemAction from "../../lib/actions/count-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("CountItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run CountItemAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new CountItemAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        inventory: { items: () => [{ name: "torch", count: 7 }] },
      }),
    });
    await action.do({
      message: "how many torches do you have",
      messageElems: ["how many torches do you have", "torches"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "I have 7 torches");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
