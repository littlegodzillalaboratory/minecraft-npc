"use strict";
import SayWeatherAction from "../../lib/actions/say-weather.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("SayWeatherAction", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run SayWeatherAction", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayWeatherAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ thunderState: 0, isRaining: true }),
    });
    await action.do({
      message: "is it raining",
      messageElems: ["is it raining"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "The weather is raining");
    assert.equals(setActionInfo.firstCall.args[1], "success");
  });

  it("should say it is a thunderstorm when thunder state is active", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayWeatherAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ thunderState: 1, isRaining: false }),
    });
    await action.do({
      message: "is it raining",
      messageElems: ["is it raining"],
      player: "alice",
    });
    assert.equals(
      sayMessage.firstCall.args[0],
      "The weather is a thunderstorm",
    );
  });

  it("should say it is clear when there is no rain or thunder", async () => {
    const sayMessage = sinon.stub().resolves("success");
    const setActionInfo = sinon.spy();
    const action = new SayWeatherAction({
      sayMessage,
      getRegister: () => ({ setActionInfo }),
      getBot: () => ({ thunderState: 0, isRaining: false }),
    });
    await action.do({
      message: "is it raining",
      messageElems: ["is it raining"],
      player: "alice",
    });
    assert.equals(sayMessage.firstCall.args[0], "The weather is clear");
  });
});
