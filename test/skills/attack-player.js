"use strict";
import AttackPlayerSkill from "../../lib/skills/attack-player.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("AttackPlayerSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should attack the player entity when visible", () => {
    const carolEntity = { position: {} };
    const bot = {
      players: { carol: { entity: carolEntity } },
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new AttackPlayerSkill(bot);
    skill.do({ player: "carol" });
    assert.same(bot.pvp.attack.firstCall.args[0], carolEntity);
    assert.equals(bot.chat.callCount, 0);
  });

  it("should say cannot see player when player entity is missing", () => {
    const bot = {
      players: {},
      pvp: { attack: sinon.spy() },
      chat: sinon.spy(),
    };
    const skill = new AttackPlayerSkill(bot);
    skill.do({ player: "carol" });
    assert.equals(bot.chat.firstCall.args[0], "I cannot see carol");
    assert.equals(bot.pvp.attack.callCount, 0);
  });
});
