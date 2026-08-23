"use strict";
import FindItemAction from "../../lib/actions/find-item.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FindItemAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FindItemAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FindItemAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        inventory: { items: () => [] },
      }),
    });
    await action.do({
      message: "do you have a boat",
      messageElems: ["do you have a boat", "boat"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "No, I do not have any boat");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say how many of the item it has", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FindItemAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        inventory: { items: () => [{ name: "boat", count: 2 }] },
      }),
    });
    await action.do({
      message: "do you have a boat",
      messageElems: ["do you have a boat", "boat"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "Yes, I have 2 boat");
  });

  it("should match items by their singular name", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FindItemAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({
        inventory: { items: () => [{ name: "boat", count: 1 }] },
      }),
    });
    await action.do({
      message: "do you have boats",
      messageElems: ["do you have boats", "boats"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "Yes, I have 1 boats");
  });
});
