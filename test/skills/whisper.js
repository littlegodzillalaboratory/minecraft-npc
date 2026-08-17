"use strict";
import WhisperSkill from "../../lib/skills/whisper.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("WhisperSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should whisper the message to the player", () => {
    const bot = {
      whisper: sinon.spy(),
    };
    const skill = new WhisperSkill(bot);
    skill.do({ player: "alice", message: "psst" });
    assert.equals(bot.whisper.firstCall.args, ["alice", "psst"]);
  });
});
