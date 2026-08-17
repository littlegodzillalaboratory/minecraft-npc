"use strict";
import MountEntitySkill from "../../lib/skills/mount-entity.js";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("MountEntitySkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should mount the nearest matching entity", () => {
    const horse = { name: "horse" };
    const bot = {
      nearestEntity: (predicate) => (predicate(horse) ? horse : null),
      mount: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new MountEntitySkill(bot);
    skill.do({ entityName: "horse" });
    assert.same(bot.mount.firstCall.args[0], horse);
  });

  it("should say cannot find entity when none matches", () => {
    const bot = {
      nearestEntity: () => null,
      mount: sinon.spy(),
      chat: sinon.spy(),
    };
    const skill = new MountEntitySkill(bot);
    skill.do({ entityName: "horse" });
    assert.equals(
      bot.chat.firstCall.args[0],
      "I cannot find any horse to ride nearby",
    );
    assert.equals(bot.mount.callCount, 0);
  });
});
