"use strict";
import MessageChatGptSkill from "../../lib/skills/message-chatgpt.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MessageChatGptSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should run MessageChatGptSkill", async () => {
    const chat = sinon.spy();
    const bot = {
      chatgpt: { sendMessage: sinon.stub().resolves("reply") },
      chat,
    };
    const skill = new MessageChatGptSkill(bot);
    await skill.do({ username: "alice", message: "hello" });
    assert.equals(bot.chatgpt.sendMessage.callCount, 1);
    assert.equals(chat.firstCall.args[0], "reply");
  });
  it("should return class name as id", () => {
    const skill = new MessageChatGptSkill({});
    assert.equals(skill.getId(), "MessageChatGptSkill");
  });

});
