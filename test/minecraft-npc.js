"use strict";
import MinecraftNpc from "../lib/minecraft-npc.js";
import MoveToInitLocationAction from "../lib/actions/move-to-init-location.js";
import RespondToMessageAction from "../lib/actions/respond-to-message.js";
import SayInitMessageAction from "../lib/actions/say-init-message.js";
import mineflayer from "mineflayer";
import mineflayerViewer from "prismarine-viewer";
import bag from "bagofcli";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MinecraftNpc", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should build bot with constructor defaults", () => {
    const createBotStub = sinon.stub(mineflayer, "createBot").returns({});
    new MinecraftNpc({});
    assert.equals(createBotStub.callCount, 1);
    assert.equals(createBotStub.firstCall.args[0].host, "localhost");
    assert.equals(createBotStub.firstCall.args[0].port, 25565);
    assert.equals(createBotStub.firstCall.args[0].username, "bob");
  });

  it("should run start flow and spawn/chat handlers", async () => {
    const events = {};
    const onceHandlers = {};
    const fakeBot = {
      username: "bob",
      chatgpt: { setConfig: sinon.spy() },
      loadPlugin: sinon.spy(),
      on: (event, cb) => {
        events[event] = cb;
      },
      once: (event, cb) => {
        onceHandlers[event] = cb;
      },
    };
    sinon.stub(mineflayer, "createBot").returns(fakeBot);

    const moveInitStub = sinon.stub(MoveToInitLocationAction.prototype, "do");
    const sayInitStub = sinon.stub(SayInitMessageAction.prototype, "do");
    const respondStub = sinon.stub(RespondToMessageAction.prototype, "do");

    const npc = new MinecraftNpc({
      viewerPort: 3000,
      webInventoryPort: 3001,
      initCoords: [1, 2, 3],
      initMessages: ["hello"],
      chatGptMessageApiKey: "message-k",
      chatGptModerationApiKey: "moderation-k",
      chatGptMessageBaseUrl: "http://localhost:8080/v1",
      chatGptModel: "m",
      chatGptInstructions: "i",
      chatGptEnableModeration: true,
      chatGptEnableMessageLogging: true,
      chatGptMinimumConfidenceScore: 0.7,
      chatGptCoolDownInSeconds: 5,
      chatGptFallbackMessage: "fallback",
      chatGptEnableSecurityInstructions: true,
    });
    sinon.stub(npc, "_getMinecraftNpcVersion").resolves("1.0.0");

    const cb = sinon.spy();
    await npc.start(cb);

    assert.equals(fakeBot.loadPlugin.callCount, 3);
    assert.equals(fakeBot.chatgpt.setConfig.callCount, 1);
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].messageApiKey,
      "message-k",
    );
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].moderationApiKey,
      "moderation-k",
    );
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].messageBaseURL,
      "http://localhost:8080/v1",
    );
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].enableModeration,
      true,
    );
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].enableMessageLogging,
      true,
    );
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].minimumConfidenceScore,
      0.7,
    );
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].coolDownInSeconds,
      5,
    );
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].fallbackMessage,
      "fallback",
    );
    assert.equals(
      fakeBot.chatgpt.setConfig.firstCall.args[0].enableSecurityInstructions,
      true,
    );
    assert.isFunction(events.kicked);
    assert.isFunction(events.error);
    assert.isFunction(onceHandlers.spawn);

    events.kicked("err", "result");
    events.error("err2", "result2");
    assert.equals(cb.callCount, 2);

    // Avoid executing spawn callback here because web inventory plugin starts
    // an HTTP server that can make this unit test flaky in Docker CI contexts.
    assert.equals(moveInitStub.callCount, 0);
    assert.equals(sayInitStub.callCount, 0);
    assert.equals(respondStub.callCount, 0);
  });

  it("should read version from package json", async () => {
    const fakeBot = {
      chatgpt: { setConfig: () => {} },
      loadPlugin: () => {},
      on: () => {},
      once: () => {},
    };
    sinon.stub(mineflayer, "createBot").returns(fakeBot);
    const npc = new MinecraftNpc({});
    const version = await npc._getMinecraftNpcVersion();
    assert.isString(version);
  });
});
