import _ from "lodash";

function isValidCoord(posX, posY, posZ) {
  return _.isNumber(posX) && _.isNumber(posY) && _.isNumber(posZ);
}

function isValidMessage(message) {
  return _.isString(message) && message.length > 0;
}

function isValidMoveDirection(distance, direction) {
  return (
    _.isInteger(distance) &&
    distance > 0 &&
    _.includes(
      ["forward", "backward", "leftward", "rightward", "downward", "upward"],
      direction,
    )
  );
}

function isValidFaceDirection(direction) {
  return _.includes(["north", "south", "east", "west", "around"], direction);
}

function isValidEquipDestination(destination) {
  return _.includes(
    ["hand", "off-hand", "head", "torso", "legs", "feet"],
    destination,
  );
}

function isValidDigTarget(target) {
  return _.includes(["below", "cursor"], target);
}

function isValidPositiveInteger(value) {
  return _.isInteger(value) && value > 0;
}

function isValidBoolean(value) {
  return _.isBoolean(value);
}

function isValidGesture(gestureName) {
  return _.includes(["nod", "shake"], gestureName);
}

const funcs = {
  isValidCoord: isValidCoord,
  isValidMessage: isValidMessage,
  isValidMoveDirection: isValidMoveDirection,
  isValidFaceDirection: isValidFaceDirection,
  isValidEquipDestination: isValidEquipDestination,
  isValidDigTarget: isValidDigTarget,
  isValidPositiveInteger: isValidPositiveInteger,
  isValidBoolean: isValidBoolean,
  isValidGesture: isValidGesture,
};

export { funcs as default };
