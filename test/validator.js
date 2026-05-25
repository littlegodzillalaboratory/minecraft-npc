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
});
