"use strict";
import BaseSkill from "../../lib/skills/base.js";
import bag from "bagofcli";
import referee from "@sinonjs/referee";
import sinon from "sinon";

const assert = referee.assert;

describe("BaseSkill", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should log default BaseSkill errors", () => {
    const errorStub = sinon.stub(bag, "logStepItemError");
    const skill = new BaseSkill({});
    skill.getId();
    skill.do({});
    assert.equals(errorStub.callCount, 2);
  });

  it("should defer player-facing outcomes when managed by an NPC", () => {
    const chat = sinon.spy();
    const skill = new BaseSkill({ deferSkillMessages: true, chat: chat });

    assert.equals(skill.inform("Ready"), { message: "Ready" });
    assert.exception(() => skill.fail("Unable to continue"), {
      name: "Error",
      message: "Unable to continue",
    });
    assert.equals(chat.callCount, 0);
  });

  it("should preserve standalone skill messaging", () => {
    const chat = sinon.spy();
    const skill = new BaseSkill({ chat: chat });

    assert.isUndefined(skill.inform("Ready"));
    assert.isUndefined(skill.fail("Unable to continue"));
    assert.equals(chat.callCount, 2);
  });

  it("should qualify only live, visible, nearby hostile entities", () => {
    const position = { x: 3, y: 4, z: 0 };
    const bot = {
      entity: { position: { x: 0, y: 0, z: 0 } },
      registry: {
        entitiesByName: {
          zombie: { category: "Hostile mobs" },
          cow: { category: "Passive mobs" },
        },
      },
      canSeeEntity: sinon.stub().returns(true),
    };
    const skill = new BaseSkill(bot);

    assert.isTrue(skill.isVisibleThreat({ name: "zombie", position }, 5));
    assert.isFalse(skill.isVisibleThreat({ name: "zombie", position }, 4));
    assert.isFalse(
      skill.isVisibleThreat({ name: "zombie", position, isValid: false }),
    );
    assert.isFalse(
      skill.isVisibleThreat({ name: "zombie", position, health: 0 }),
    );
    assert.isFalse(skill.isVisibleThreat({ name: "cow", position }, 5));
    assert.isFalse(skill.isVisibleThreat(undefined, 5));
    bot.canSeeEntity.returns(false);
    assert.isFalse(skill.isVisibleThreat({ name: "zombie", position }, 5));
  });
});
