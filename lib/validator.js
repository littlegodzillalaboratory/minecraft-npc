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

const funcs = {
  isValidCoord: isValidCoord,
  isValidMessage: isValidMessage,
  isValidMoveDirection: isValidMoveDirection,
};

export { funcs as default };
