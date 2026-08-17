"use strict";
import FeedAnimalAction from "../../lib/actions/feed-animal.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("FeedAnimalAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run FeedAnimalAction", async () => {
    const feedAnimal = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new FeedAnimalAction({
      feedAnimal,
      getRegister: () => ({ setActionInfo }),
    });
    await action.do({
      message: "feed the cow",
      messageElems: ["feed the cow", "cow"],
      player: "alice",
    });
    assert.equals(feedAnimal.firstCall.args[0], "cow");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });
});
