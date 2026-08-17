"use strict";
import validator from "../lib/validator.js";
import referee from "@sinonjs/referee";

const assert = referee.assert;

describe("validator", () => {
  it("should validate coordinates", () => {
    assert.isTrue(validator.isValidCoord(1, 2, 3));
    assert.isFalse(validator.isValidCoord(1, "2", 3));
  });

  it("should validate messages", () => {
    assert.isTrue(validator.isValidMessage("hello"));
    assert.isFalse(validator.isValidMessage(""));
    assert.isFalse(validator.isValidMessage(123));
  });

  it("should validate move direction", () => {
    assert.isTrue(validator.isValidMoveDirection(2, "forward"));
    assert.isFalse(validator.isValidMoveDirection(0, "forward"));
    assert.isFalse(validator.isValidMoveDirection(2, "diagonal"));
  });

  it("should validate face direction", () => {
    assert.isTrue(validator.isValidFaceDirection("north"));
    assert.isTrue(validator.isValidFaceDirection("around"));
    assert.isFalse(validator.isValidFaceDirection("diagonal"));
  });

  it("should validate equip destination", () => {
    assert.isTrue(validator.isValidEquipDestination("hand"));
    assert.isTrue(validator.isValidEquipDestination("off-hand"));
    assert.isFalse(validator.isValidEquipDestination("pocket"));
  });

  it("should validate dig target", () => {
    assert.isTrue(validator.isValidDigTarget("below"));
    assert.isTrue(validator.isValidDigTarget("cursor"));
    assert.isFalse(validator.isValidDigTarget("above"));
  });

  it("should validate positive integer", () => {
    assert.isTrue(validator.isValidPositiveInteger(3));
    assert.isFalse(validator.isValidPositiveInteger(0));
    assert.isFalse(validator.isValidPositiveInteger("3"));
  });

  it("should validate boolean", () => {
    assert.isTrue(validator.isValidBoolean(true));
    assert.isTrue(validator.isValidBoolean(false));
    assert.isFalse(validator.isValidBoolean("true"));
  });

  it("should validate gesture", () => {
    assert.isTrue(validator.isValidGesture("nod"));
    assert.isTrue(validator.isValidGesture("shake"));
    assert.isFalse(validator.isValidGesture("wink"));
  });
});
