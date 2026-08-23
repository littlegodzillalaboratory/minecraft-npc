"use strict";
import ListPlayersAction from "../../lib/actions/list-players.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("ListPlayersAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run ListPlayersAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ListPlayersAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ username: "bob", players: { bob: {}, alice: {} } }),
    });
    await action.do({
      message: "who is online",
      messageElems: ["who is online"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "Players online: alice");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say no other players are online", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new ListPlayersAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ username: "bob", players: { bob: {} } }),
    });
    await action.do({
      message: "who is online",
      messageElems: ["who is online"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "I do not see any other players online",
    );
  });
});
